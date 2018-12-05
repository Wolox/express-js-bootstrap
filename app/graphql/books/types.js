const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

exports.bookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: { type: GraphQLString },
    publisher: { type: GraphQLString },
    price: { type: GraphQLInt },
    link: { type: GraphQLString },
    year: { type: GraphQLInt }
  }
});

exports.bookInputType = new GraphQLInputObjectType({
  name: 'BookInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: { type: GraphQLString },
    publisher: { type: GraphQLString },
    price: { type: GraphQLInt },
    link: { type: GraphQLString },
    year: { type: GraphQLInt }
  }
});
