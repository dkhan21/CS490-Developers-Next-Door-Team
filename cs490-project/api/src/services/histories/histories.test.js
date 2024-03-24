import {
  histories,
  history,
  createHistory,
  updateHistory,
  deleteHistory,
} from './histories'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('histories', () => {
  scenario('returns all histories', async (scenario) => {
    const result = await histories()

    expect(result.length).toEqual(Object.keys(scenario.history).length)
  })

  scenario('returns a single history', async (scenario) => {
    const result = await history({ id: scenario.history.one.id })

    expect(result).toEqual(scenario.history.one)
  })

  scenario('creates a history', async () => {
    const result = await createHistory({
      input: {
        inputLanguage: 'String',
        outputLanguage: 'String',
        inputText: 'String',
        outputText: 'String',
      },
    })

    expect(result.inputLanguage).toEqual('String')
    expect(result.outputLanguage).toEqual('String')
    expect(result.inputText).toEqual('String')
    expect(result.outputText).toEqual('String')
  })

  scenario('updates a history', async (scenario) => {
    const original = await history({ id: scenario.history.one.id })
    const result = await updateHistory({
      id: original.id,
      input: { inputLanguage: 'String2' },
    })

    expect(result.inputLanguage).toEqual('String2')
  })

  scenario('deletes a history', async (scenario) => {
    const original = await deleteHistory({
      id: scenario.history.one.id,
    })
    const result = await history({ id: original.id })

    expect(result).toEqual(null)
  })
})
