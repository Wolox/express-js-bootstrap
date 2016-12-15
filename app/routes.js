const auth = require('./middlewares/auth'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  frontend = require('./controllers/frontend'),
  unknownResource = require('./controllers/unknownResource');

exports.init = (app) => {

  // Users
  app.get('/api/users/sessions', [], users.login);
  app.get('/api/users/me', [auth.secure], users.loggedUser);
  app.put('/api/users', [auth.secure], users.update);
  app.post('/api/users', [], users.create);
  app.post('/api/logout', [auth.secure], users.logout);

  // Books
  app.get('/api/books', [], books.getAll);
  app.get('/api/books/:id', [], books.getById);

  // Frontend endpoints
  app.get('/*', frontend.index)

};
