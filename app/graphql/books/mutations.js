const { GraphQLNonNull, GraphQLBoolean } = require('graphql'),
  { book: bookModel } = require('../../models'),
  { bookInputType } = require('./types');

exports.createBook = {
  description: 'Adds a single book',
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(bookInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const book = await bookModel.createModel(data);
    return true;
  }
};
