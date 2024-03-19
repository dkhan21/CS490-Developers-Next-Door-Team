import { users, user, createUser, updateUser, deleteUser } from './users'

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        email: 'String8286346',
        hashedPassword: 'String',
        salt: 'String',
      },
    })

    expect(result.email).toEqual('String8286346')
    expect(result.hashedPassword).toEqual('String')
    expect(result.salt).toEqual('String')
  })

  scenario('updates user profile', async (scenario) => {
    //fetch user before update 
    const originalUser = await user({ id: scenario.user.one.id })

    //update the user's profile
    const updatedUser = await updateUser({
      input: {
        id: originalUser.id, 
        email: 'new-email@example.com',
      },
    })

    //check if user was updated
    const result = await user({ id: updatedUser.id })
    expect(result.email).toEqual('new-email@example.com')
  })

  scenario('deletes a user', async (scenario) => {
    // Fetch the user before deletion
    const originalUser = await user({ id: scenario.user.one.id })
    expect(originalUser).not.toEqual(null)
  
    // Delete the user
    await deleteUser({ id: scenario.user.one.id })
  
    // Check if the user was deleted
    const result = await user({ id: scenario.user.one.id })
    expect(result).toEqual(null)
  })
  
})
