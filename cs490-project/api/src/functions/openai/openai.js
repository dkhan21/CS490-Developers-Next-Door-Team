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
  try {
    const body = JSON.parse(event.body);

    const code = body.messages[0].content;
    const targetLanguage = body.messages[0].target;
    const sourceLanguage = body.messages[0].source;
    const messaged = body.messages[0].message;

    let prompt;
    if (messaged === 1) {
      prompt = "Translate this code ( " + code + " ) from " + sourceLanguage + " to " + targetLanguage;
    }
    if (messaged === 2) {
      prompt = "Check if this code ( " + code + " ) is in " + sourceLanguage + ". If it's return Yes. If not return No";
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
    console.error('Error calling OpenAI API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error calling OpenAI API' }),
    };
  }
}
