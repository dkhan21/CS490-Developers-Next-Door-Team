import { logger } from 'src/lib/logger'
import OpenAI from 'openai'

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

import { authDecoder, dbAuthSession, extractCookie, getSession, decryptSession } from '@redwoodjs/auth-dbauth-api'

const openai = new OpenAI();


export const handler = async (event, context) => {
  //logger.info(`${event.httpMethod} ${event.path}: openai function`)
  
  try {

    
    //Cookie will contain dbAuth information
    const cookie = extractCookie(event);
    if(cookie == undefined || cookie == null){
      console.log("Not logged in")
      return {
        statusCode: 401
      };
    }
    if (cookie) {
      //Obtain encrypted dbAuth string from cookie
      const encryptedSession = getSession(cookie, "session_8911")
      
      if (encryptedSession) {
        try{
          const [session, _csrfToken] = decryptSession(encryptedSession)
          context.currentUser = { ...session }
          console.log(context.currentUser);
        }
        catch(error){
          //Usually this means the cookie has been tampered with
          console.error('Error decrypting session - ', error);
          return {
            statusCode: 401
          }
        }

      }
      else {
        console.log("Invalid session")
        return {
          statusCode: 401
        };
      }
    }
    
    
    
    const body = JSON.parse(event.body);
    const code = body.messages[0].content;
    const targetLanguage = body.messages[0].target;
    const sourceLanguage = body.messages[0].source;

    


    const prompt = "Translate " + code + " from " + sourceLanguage + " to " + targetLanguage;
    
    

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo"
    });
    return {
      statusCode: 200,
      headers: {
            'Content-Type': 'application/json'
       },
      body: JSON.stringify({ completion: completion.choices[0].message.content }),
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      statusCode: 500
    }
  }

}
