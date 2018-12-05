const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  books = require('./books');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...books.queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...books.mutations
    }
  })
});
