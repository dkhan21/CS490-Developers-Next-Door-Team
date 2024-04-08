export const schema = gql`
  type History {
    id: Int!
    inputLanguage: String!
    outputLanguage: String!
    inputText: String!
    outputText: String!
    createdAt: DateTime!
    status: String!
    userId: Int!
  }

  type Query {
    histories: [History!]! @requireAuth
    history(id: Int!): History @requireAuth
    historyCount(id: Int!): Int! @skipAuth
  }

  input CreateHistoryInput {
    inputLanguage: String!
    outputLanguage: String!
    inputText: String!
    outputText: String!
    status: String!
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
