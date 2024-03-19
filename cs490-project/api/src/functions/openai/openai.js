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

const openai = new OpenAI();

export const handler = async (event, context) => {
  //logger.info(`${event.httpMethod} ${event.path}: openai function`)
  try {
    //const body = JSON.stringify(event.body);
    const body = JSON.parse(event.body);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: body.messages[0].content }],
      model: "gpt-3.5-turbo"
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completion: completion.choices[0].message.content }),
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      statusCode: 500
    }
  }
  
}
