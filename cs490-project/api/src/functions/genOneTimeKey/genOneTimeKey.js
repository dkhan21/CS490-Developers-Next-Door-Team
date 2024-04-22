import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import sgMail from '@sendgrid/mail'
import SENDGRID_API_KEY from '**/.env'
import { gql, useMutation, useQuery } from '@redwoodjs/web'
import { PrismaClient } from '@prisma/client';
import { user } from 'src/services/users/users'

const prisma = new PrismaClient();


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */



const USER_LOGIN_QUERY = gql`
  query UserLoginToken($email: String!) {
    userLoginToken(email: $email) {
      email
      token
      createdAt
    }
  }
`;


const CREATE_LOGIN_TOKEN_MUTATION = gql`
  mutation CreateUserLoginToken($input: CreateUserLoginTokenInput!) {
    createUserLoginToken(input: $input) {
      email
      token
    }
  }
`;



const DELETE_LOGIN_TOKEN_MUTATION = gql`
  mutation DeleteUserLoginToken($email: String!) {
    deleteUserLoginToken(email: $email) {
      email
    }
  }
`;



export const VerificationEmail = async (email, onekey) => {
  console.log('Sending login 2FA email to:', email, 'with API:', SENDGRID_API_KEY)
  if(email == "" || email == "fake@fake.fake"){
    return;
  }
  const msg = {
    to: email,
    from: 'kas23@njit.edu',
    subject: 'Code Harbor: Verification Code for Login',
    text: `Here is your verification code for login: ${onekey}`, 
    html: `Here is your verification code for login: ${onekey}`,
  };
  return sgMail.send(msg);
}
async function findUnique(userEmail){
  const user = await prisma.userLoginToken.findUnique({
    where: { email: userEmail },
  });
  return user;
}
async function createToken(userEmail, generatedToken){
  await prisma.UserLoginToken.create({
    data: { email: userEmail, token: generatedToken},
  });
}
async function deleteToken(userEmail){
  await prisma.userLoginToken.delete({
    where: { email: userEmail },
  });
}

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: genOneTimeKey function`)

  const body = JSON.parse(event.body);
  const userEmail = body.messages[0].userEmail;
  const inputPin = body.messages[0].pin;
  console.log("user email: " + userEmail);

  const generatedToken = Math.floor(Math.random()*10000)
  console.log(generatedToken);
  
  const users = await findUnique(userEmail);
  
  const timeoutMinutes = 5;
  
  //User already has a token ready
  if(users != null){
    //Check age of token
    const dateOfGen = users.createdAt; 
    //If a token is sent by user then perform verification instead of generation 
    if(inputPin != ""){
      if((new Date() - dateOfGen)/(1000*60) > timeoutMinutes){
        //Token login used is too old
        await deleteToken(userEmail);
        return {
          
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valid: false }),
        }
      }
      if(parseInt(inputPin) == users.token){
        console.log("User PIN is correct");
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valid: true }),
        }
      }
      else {
        console.log("User PIN is incorrect");
        return {
          
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valid: false }),
        }
      }
    }

   
    //Token is older than 5 minutes
    
    if((new Date() - dateOfGen)/(1000*60) > timeoutMinutes){
      console.log("Cleared outdated token and generated a new one for " + userEmail);

      await VerificationEmail(userEmail, generatedToken);
      
      await deleteToken(userEmail);
      await createToken(userEmail, generatedToken);
    }
    else {
      console.log("Token already exists for " + userEmail);
    }
  }
  else if(inputPin == ""){
    console.log("Generating token for " + userEmail);
    
    await VerificationEmail(userEmail, generatedToken);
    
    await createToken(userEmail, generatedToken);
  }

  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  }
}
