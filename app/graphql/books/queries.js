const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getSelectionSet } = require('../utils'),
  { bookType } = require('./types'),
  { book: bookModel } = require('../../models');

exports.book = {
  description: 'it returns a single book, can be queried by any field',
  type: bookType,
  args: {
    name: {
      name: 'title',
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (obj, { name }, context, info) => {
    const attributes = getSelectionSet(info);
    return bookModel.findOne({
      attributes,
      where: { name }
    });
  }
};
