import { mockHttpEvent } from '@redwoodjs/testing/api'

jest.mock("./validate", () => ({
  validateCookie: jest.fn(() => -1),
}));


import { handler } from './openai'

describe('openai function', () => {
  it('Fails to perform translation when session is invalid', async () => {
    mockCurrentUser({ name: 'test-user', roles: ['some-role'] });

    const simulatedPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            content: "printf('Hello');",
            target: "Python",
            source: "C"
          }
        ]
      }),
    };
    

    const response = await handler(simulatedPayload, null)

    expect(response.statusCode).toBe(401)
  })

})
