export const schema = gql`
  type History {
    id: Int!
    inputLanguage: String!
    outputLanguage: String!
    inputText: String!
    outputText: String!
    createdAt: DateTime!
    userId: Int!
  }

  type Query {
    histories: [History!]! @requireAuth
    history(id: Int!): History @requireAuth
  }

  input CreateHistoryInput {
    inputLanguage: String!
    outputLanguage: String!
    inputText: String!
    outputText: String!
    userId: Int!
  }

  input UpdateHistoryInput {
    inputLanguage: String
    outputLanguage: String
    inputText: String
    outputText: String
    userId: Int
  }

  type Mutation {
    createHistory(input: CreateHistoryInput!): History! @requireAuth
    updateHistory(id: Int!, input: UpdateHistoryInput!): History! @requireAuth
    deleteHistory(id: Int!): History! @requireAuth
  }
`
