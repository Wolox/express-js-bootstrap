const logger = require('../../logger');

const createUser = (resolve, root, args) => {
  logger.info("Middleware for 'createUser' mutation");
  // Add different actions that you want to be executed before your resolver, i.e: input validation or caching
  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  Mutation: {
    createUser
  },
  User: {}
};
