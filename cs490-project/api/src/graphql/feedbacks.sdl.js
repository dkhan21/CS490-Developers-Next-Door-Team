export const schema = gql`
  type Feedback {
    id: Int!
    name: String!
    rating: Int!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    feedbacks: [Feedback!]! @skipAuth
  }

  input CreateFeedbackInput {
    name: String!
    rating: Int!
    body: String!
  }

  input UpdateFeedbackInput {
    name: String!
    rating: Int!
    body: String!
  }
  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @skipAuth
    updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback! @skipAuth
    deleteFeedback(id: Int!): Feedback! @skipAuth
  }
`
