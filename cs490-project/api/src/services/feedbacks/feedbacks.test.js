import {
  feedbacks,
  feedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from './feedbacks'
import Filter from 'bad-words';


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

  scenario('returns a single feedback', async (scenario) => {
    const result = await feedback({ id: scenario.feedback.one.id })

    expect(result).toEqual(scenario.feedback.one)
  })

  scenario('creates a feedback', async () => {
    const result = await createFeedback({
      input: { name: 'String', rating: 1638966, body: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.rating).toEqual(1638966)
    expect(result.body).toEqual('String')
  })

  scenario('updates a feedback', async (scenario) => {
    const original = await feedback({
      id: scenario.feedback.one.id,
    })
    const result = await updateFeedback({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a feedback', async (scenario) => {
    const original = await deleteFeedback({
      id: scenario.feedback.one.id,
    })
    const result = await feedback({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('does not create feedback with inappropriate words', async () => {
    const filter = new Filter();
    const n = 'Whore';
    const r = 1638966;
    const b = 'Such a dog shit site';

    let exam = null;
        // Create feedback with potentially inappropriate words
    if (!filter.isProfane(n) || !filter.isProfane(b)) {
      exam = await createFeedback({
        input: { id: 200, name: n, rating: r, body: b },
      })
    }
    expect(exam).toBeNull();
  });


})
