const { gql } = require('apollo-server');

const rootTpyes = gql`
  extend type Query {
    healthCheck: String!
  }
`;

exports.typeDefs = [rootTpyes];
