const { PubSub } = require('apollo-server'),
  pubsub = new PubSub();

const createEvent = (eventId, publishFunction) => ({
  iter: () => pubsub.asyncIterator(eventId),
  publish: (...params) => pubsub.publish(eventId, publishFunction(...params))
});

const USER_LOGGED_IN = 'USER_LOGGED_IN';
exports.userLoggedIn = createEvent(USER_LOGGED_IN, username => ({
  onLogin: `${username} just logged in`
}));
