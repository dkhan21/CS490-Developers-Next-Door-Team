import { logger } from 'src/lib/logger'
import OpenAI from 'openai'
import { validateCookie } from './validate';

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

const openai = new OpenAI();


export const handler = async (event, context) => {
  //logger.info(`${event.httpMethod} ${event.path}: openai function`)

  try {

    const val = await validateCookie(event, context);


    if(val == -1){
      console.log("Invalid session")
      return {
        statusCode: 401
      };
    }
    else {
      //Prints out the active user id
      console.log(val);
    }


    const body = JSON.parse(event.body);
    const code = body.messages[0].content;
    const targetLanguage = body.messages[0].target;
    const sourceLanguage = body.messages[0].source;
    const promptNumber = body.messages[0].promptNum;

    let prompt;

    if(promptNumber === 1){
      prompt = "Translate this code ( " + code + " ) from " + sourceLanguage + " to " + targetLanguage;
    }

    if(promptNumber === 2){
      prompt = "Detect what programming language this text is in. If the code is more than 70% of one of the languages listed, Then return that language. Return only Java, Python, C++, C, Javascript, or Unrecognized.   " + code;
    }

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
    let code = 500;
    let errorMessage = 'An Error Occurred.'
    console.error('Error calling OpenAI API:', error);
    console.log(error);
    if(error.message == 'Invalid Authentication'){
      errorMessage = 'Invalid Authentication';
      code = 401;
    }
    else if(error.message = 'Incorrect API key provided'){
      errorMessage = 'Incorrect API key provided';
      code = 401;
    }
    else if(error.message = 'Country, region, or territory not supported'){
      errorMessage = 403;
    }
    else if(error.message == 'The engine is currently overloaded, please try again later'){
      errorMessage = 503;
    }
    else if(error.message == 'Rate limit reached for requests'){
      errorMessage = 429;
    }
    return {
      error: error.message,
      statusCode: 500
    }
  }
}
