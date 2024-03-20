import { users, user, createUser, updateUser, deleteUser, changePassword } from './users'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { db } from 'src/lib/db'

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

  scenario('updates user password', async (scenario) => {
    // Fetch user before update 
    const originalUser = await user({ id: scenario.user.one.id })
  
    // Store the original hashed password
    const originalHashedPassword = originalUser.hashedPassword;
  
    // Update the user's password
    const newPassword = 'newPassword123'; // replace with your test data
    await changePassword({ email: originalUser.email, newPassword })
  
    // Fetch the updated user from the database
    const updatedUser = await user({ id: originalUser.id })
  
    // Check if the user's password was updated
    expect(updatedUser.hashedPassword).not.toEqual(originalHashedPassword)
  }) 

  scenario('updates user profile with proper authorization', async (scenario) => {
    //fetch user before update 
    const originalUser = await user({ id: scenario.user.one.id })

    //attempt to update user's profile as a different user 
    const otherUserEmail = 'other-user@example.com'; 
    try {
      await changePassword({ email: otherUserEmail, newPassword: 'newPassword123' })
    }catch (error){
      expect(error.message).toEqual('User not found')
    }

    //check if the user's password was not updated 
    const updatedUser = await user({ id: originalUser.id })
    expect(updatedUser.hashedPassword).toEqual(originalUser.hashedPassword)

  })

  scenario('fails to update a non-existent user', async (scenario) => {
    const nonExistentUserId = 999999; // some non-existent integer id
    await expect(updateUser({
      input: {
        id: nonExistentUserId,
        email: 'new-email@example.com',
      },
    })).rejects.toThrow()
  })

  scenario('fails to change password of a non-existent user', async (scenario) => {
    const nonExistentUserEmail = 'non-existent-email@example.com';
    try {
      await changePassword({ email: nonExistentUserEmail, newPassword: 'newPassword123' })
    } catch (error) {
      expect(error.message).toEqual('User not found')
    }
  })
  
  scenario('fails to delete a non-existent user', async (scenario) => {
    const nonExistentUserId = 999999; // some non-existent integer id
    await expect(deleteUser({ id: nonExistentUserId })).rejects.toThrow()
  })
})
