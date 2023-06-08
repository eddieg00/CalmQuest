const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    id: ID!
    name: String!
    email: String!
    tasks: [ID]!
    completedTasks: Int!
 }

 type Task {
    id: ID!
    statement: String!
    completed: Boolean!
 }
 
 type Auth{
    token: ID!
    user: User
 }

type Query{
    users: [User]
    me: User
}

type Mutation{
    
    addUser (name: String!, email: String!, password: String!): Auth
    login (email: String!, password: String!): Auth
}  
`;

module.exports = typeDefs;