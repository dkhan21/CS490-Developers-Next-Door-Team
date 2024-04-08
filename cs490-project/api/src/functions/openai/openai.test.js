import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './openai'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions


describe('openai function', () => {
  it('Authenticates and receives successful response', async () => {

    const simulatedPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
              source: "C"
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
      "messages": [
        {
          "role": "system",
          "content": "a",
          "source": "b",
          "target": "c"
        }
      ]
    };




    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload),
      },
    })

    const result = await handler(httpEvent)
    const body = result.body

    expect(result.statusCode).toBe(500)
  })

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})
