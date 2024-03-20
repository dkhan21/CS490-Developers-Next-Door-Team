import { db } from 'src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import CryptoJS from 'crypto-js'


export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ input }) => {
  return db.user.update({
    data: {
      email: input.email
    },
    where: { id: input.id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const changePassword = async ({ email, currentPassword, newPassword }) => {
  //fetch user from the database 
  const user = await db.user.findUnique({ where: { email } })

  if (!user){
    throw new Error('User not found')
  }

  const [hashedPassword, salt] = hashPassword(newPassword)

  //update the user's password in the database 
  const updatedUser = await db.user.update({
    where: { email }, 
    data: { hashedPassword, salt },
  })

  return updatedUser
}