import { mockHttpEvent } from '@redwoodjs/testing/api'

import { VerificationEmail, handler } from './genOneTimeKey'

jest.mock("./genOneTimeKey", () => ({
  ...jest.requireActual("./genOneTimeKey"),
  findUnique: jest.fn(() => Promise.resolve(mockValidationData)),
  createToken: jest.fn(),
  deleteToken: jest.fn(),
  VerificationEmail: jest.fn()
}));
const mockValidationData = {
  userEmail: "fake@fake.fake",
  pin: "",
};


//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('genOneTimeKey function', () => {
  it('Email with no pin gets new pin', async () => {
    const responsePayload = {
      messages: [
        {
          userEmail: "fake@fake.fake",
          pin: "",
        },
      ],
    }
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responsePayload),
    })
    
    const response = await handler(httpEvent, null)

    expect(response.statusCode).toBe(200)
  })
})
