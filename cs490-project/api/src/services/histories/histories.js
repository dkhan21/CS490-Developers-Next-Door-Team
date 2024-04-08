import { db } from 'src/lib/db'

export const histories = () => {
  return db.history.findMany()
}

export const history = ({ id }) => {
  return db.history.findUnique({
    where: { id },
  })
}

export const createHistory = ({ input }) => {
  return db.history.create({
    data: input,
  })
}

export const updateHistory = ({ id, input }) => {
  return db.history.update({
    data: input,
    where: { id },
  })
}

export const deleteHistory = ({ id }) => {
  return db.history.delete({
    where: { id },
  })
}
