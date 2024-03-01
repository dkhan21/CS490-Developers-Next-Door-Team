import { feedbacks, createFeedback } from './feedbacks'
import { standard } from './feedbacks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('feedbacks', () => {
  scenario('returns all feedbacks', async (scenario) => {
    const result = await feedbacks()

    expect(result.length).toEqual(Object.keys(scenario.feedback).length)
  })
})

scenario('standard', 'create new feedback',  async (scenario) => {
  const feedback = await createFeedback({
    input: {
      name: 'Billy Bob',
      rating: 4,
      body: 'What is your favorite tree bark?',
    },
  })

  expect(feedback.name).toEqual('Billy Bob')
  expect(feedback.body).toEqual('What is your favorite tree bark?')
  expect(feedback.rating).toEqual(4)
  expect(feedback.createdAt).not.toEqual(null)
})
