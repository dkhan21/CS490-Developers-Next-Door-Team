export const schema = gql`
    type User {
        id: Int! 
        name: String 
        email: String!
        resetTokenExpiresAt: DateTime
        preferredProgrammingLanguage: String 
        preferredIDE: String
    }

    type Query{
        user(id: Int!): User @requireAuth 
        userbytoken(resetToken: String!): User @skipAuth
    }

    input UpdateUserInput {
        id: Int! 
        name: String
        email: String! 
        preferredProgrammingLanguage: String
        preferredIDE: String
    }

    type Mutation {
        updateUser(input: UpdateUserInput!): User! @requireAuth
        deleteUser(id: Int!): User @requireAuth
        changePassword(email: String!, newPassword: String!): User! @requireAuth
        changePassword2(email: String!, newPassword: String!): User! @skipAuth
        resetTokenAndExpiresAtNull(id: Int!): User! @skipAuth
    }
`