export const schema = gql`
  type Feedback {
    id: Int!
    name: String!
    rating: Int!
    body: String!
    createdAt: DateTime!
    userId: Int!
    inText: String
    outText: String
    inLanguage: String
    outLanguage: String
  }

  type Query {
    feedbacks: [Feedback!]! @skipAuth
    feedback(id: Int!): Feedback @skipAuth
  }

  input CreateFeedbackInput {
    name: String!
    rating: Int!
    body: String!
    userId: Int!
    inText: String
    outText: String
    inLanguage: String
    outLanguage: String
  }

  input UpdateFeedbackInput {
    name: String!
    rating: Int!
    body: String!
    inText: String
    outText: String
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @skipAuth
    updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback! @requireAuth
    deleteFeedback(id: Int!): Feedback! @requireAuth
  }
`;
