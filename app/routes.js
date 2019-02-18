const auth = require('./middlewares/auth'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  unknownResource = require('./controllers/unknownResource'),
  { healthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  // health
  app.get('/', [], healthCheck);
  // Users
  app.post('/users/sessions', [], users.login);
  app.get('/users/me', [auth.secure], users.loggedUser);
  app.put('/users', [auth.secure], users.update);
  app.post('/users', [], users.create);
  app.post('/logout', [auth.secure], users.logout);

  // Books
  app.get('/books', [], books.getAll);
  app.get('/books/:id', [], books.getById);
};
