export const schema = gql`
  type UserLoginToken {
    email: String!
    token: Int!
    createdAt: DateTime!
  }

  type Query {
    userLoginTokens: [UserLoginToken!]! @requireAuth
    userLoginToken(email: String!): UserLoginToken @requireAuth
  }

  input CreateUserLoginTokenInput {
    token: Int!
  }

  input UpdateUserLoginTokenInput {
    token: Int
  }

  type Mutation {
    createUserLoginToken(input: CreateUserLoginTokenInput!): UserLoginToken!
      @requireAuth
    updateUserLoginToken(
      email: String!
      input: UpdateUserLoginTokenInput!
    ): UserLoginToken! @requireAuth
    deleteUserLoginToken(email: String!): UserLoginToken! @requireAuth
  }
`
