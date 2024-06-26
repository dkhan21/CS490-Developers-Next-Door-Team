import { mockHttpEvent } from '@redwoodjs/testing/api'

jest.mock("./validate", () => ({
  validateCookie: jest.fn(() => Promise.resolve(mockValidationData)),
}));
const mockValidationData = {
  id: 2
};

import { handler } from './openai'

describe('openai function', () => {
  it('Authenticates and receives successful response', async () => {
    mockCurrentUser({ name: 'test-user', roles: ['some-role'] });

    const simulatedPayload = {
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            content: "printf('Hello');",
            target: "Python",
            source: "C",
            promptNum: 1
          }
        ]
      }),
    };


    const response = await handler(simulatedPayload, null)

    const responseBody = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(responseBody.completion).toBe("print('Hello')")
  })

  it('Unsuccessful request', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              content: "printf('Hello');",
              target: "Python",
              source: "C",
              promptNum: 1
            }
          ]
      }),
      },
    })

    const result = await handler(httpEvent)
    const body = result.body

    expect(result.statusCode).toBe(500)
  })

  it('Successful request', async () => {
    const dataPayload = {
      messages: [
        {
         role: "system",
          content: "a",
          source: "b",
          target: "c",
          promptNum: 1

        }
      ]
    };

    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPayload),
    })

    const result = await handler(httpEvent)

    expect(result.statusCode).toBe(200)
  })

  it('Handled Rate Limit Error', async () =>{
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Internal Server Error' }),
    });
    // Call the function under test
    const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai');
    // Verify that the response is an error
    expect(response.status).toBe(429);
  })

  it('Handled Unsupported Region Error', async () =>{
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ error: 'Internal Server Error' }),
    });
    // Call the function under test
    const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai');
    // Verify that the response is an error
    expect(response.status).toBe(403);
  })

  it('Handled Incorrect API key', async () =>{
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Internal Server Error' }),
    });
    // Call the function under test
    const response = await fetch('https://main--codeharbordnd.netlify.app/.netlify/.redwood/functions/openai');
    // Verify that the response is an error
    expect(response.status).toBe(401);
  })
})
