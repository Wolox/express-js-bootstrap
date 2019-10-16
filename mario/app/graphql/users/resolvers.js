const { user: User } = require('../../models'),
  { userLoggedIn } = require('../events');

const getUser = (_, params) => User.getOne(params);
const getUsers = (_, params) => User.getAll(params);

const createUser = (_, { user }) => User.createModel(user);
const logIn = (_, { credentials }) => {
  // IMPORTANT: Not a functional login, its just for illustrative purposes
  userLoggedIn.publish(credentials.username);
  return {
    accessToken: 'example_token',
    refreshToken: 'example_refresh_token',
    expiresIn: 1565990270
  };
};

module.exports = {
  Query: {
    user: getUser,
    users: getUsers
  },
  Mutation: {
    createUser,
    login: logIn
  },
  Subscription: {
    onLogin: {
      subscribe: userLoggedIn.iter
    }
  },
  User: {
    email: root => root.email
  }
};
