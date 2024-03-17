export const schema = gql`
    type User {
        id: Int! 
        name: String! 
        email: String! 
    }

    type Query{
        user(id: Int!): User @requireAuth 
    }

    input UpdateUserInput {
        id: Int! 
        name: String!
        email: String! 
    }

    type Mutation {
        updateUser(input: UpdateUserInput!): User! @requireAuth 
    }

`