import {
  userLoginTokens,
  userLoginToken,
  createUserLoginToken,
  updateUserLoginToken,
  deleteUserLoginToken,
} from './userLoginTokens'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userLoginTokens', () => {
  scenario('returns all userLoginTokens', async (scenario) => {
    const result = await userLoginTokens()

    expect(result.length).toEqual(Object.keys(scenario.userLoginToken).length)
  })

  scenario('returns a single userLoginToken', async (scenario) => {
    const result = await userLoginToken({
      email: scenario.userLoginToken.one.email,
    })

    expect(result).toEqual(scenario.userLoginToken.one)
  })

  scenario('creates a userLoginToken', async () => {
    const result = await createUserLoginToken({
      input: { email: 'String', token: 3269767 },
    })

    expect(result.email).toEqual('String')
    expect(result.token).toEqual(3269767)
  })

  scenario('updates a userLoginToken', async (scenario) => {
    const original = await userLoginToken({
      email: scenario.userLoginToken.one.email,
    })
    const result = await updateUserLoginToken({
      email: original.email,
      input: { email: 'String2' },
    })

    expect(result.email).toEqual('String2')
  })

  scenario('deletes a userLoginToken', async (scenario) => {
    const original = await deleteUserLoginToken({
      email: scenario.userLoginToken.one.email,
    })
    const result = await userLoginToken({ email: original.email })

    expect(result).toEqual(null)
  })
})
