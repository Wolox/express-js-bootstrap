const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    user(id: ID, firstName: String, email: String): User!
    users: [User]
  }
  extend type Mutation {
    createUser(user: UserInput!): User!
    login(credentials: LoginInput!): AccessToken
  }
  extend type Subscription {
    onLogin: String!
  }
`;

const customTypes = gql`
  type User {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
`;

const inputTypes = gql`
  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
`;

/* const enums = gql`
  enum UserRoleEnum {
    STANDARD
    ADMIN
  }
`;*/

exports.typeDefs = [rootTypes, customTypes, inputTypes];
