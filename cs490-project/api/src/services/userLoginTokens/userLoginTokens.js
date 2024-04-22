import { db } from 'src/lib/db'

export const userLoginTokens = () => {
  return db.userLoginToken.findMany()
}

export const userLoginToken = ({ email }) => {
  return db.userLoginToken.findUnique({
    where: { email },
  })
}

export const createUserLoginToken = ({ input }) => {
  return db.userLoginToken.create({
    data: input,
  })
}

export const updateUserLoginToken = ({ email, input }) => {
  return db.userLoginToken.update({
    data: input,
    where: { email },
  })
}

export const deleteUserLoginToken = ({ email }) => {
  return db.userLoginToken.delete({
    where: { email },
  })
}
