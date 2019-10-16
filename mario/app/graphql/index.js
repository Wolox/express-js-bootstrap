const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  { gql } = require('apollo-server'),
  { importModules } = require('./schema_import');

const modules = importModules();

const rootTypeDefinition = gql`
  ${modules.resolvers.Query ? 'type Query' : ''}
  ${modules.resolvers.Mutation ? 'type Mutation' : ''}
  ${modules.resolvers.Subscription ? 'type Subscription' : ''}
`;
const typeDefs = [rootTypeDefinition, ...modules.typeDefs];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: modules.resolvers
});

module.exports = applyMiddleware(schema, modules.middlewares);
