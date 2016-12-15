const m = require('./middlewares'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  frontend = require('./controllers/frontend'),
  unknownResource = require('./controllers/unknownResource');

exports.init = (app) => {

  // Users
  app.get('/api/login', [], users.login);
  app.get('/api/users/me', [m.secure], users.loggedUser);
  app.put('/api/users', [m.secure], users.update);
  app.post('/api/users', [], users.create);
  app.post('/api/logout', [m.secure], users.logout);

  // Books
  app.get('/api/books', [], books.getAll);
  app.get('/api/books/:id', [], books.getById);

  // Frontend endpoints
  app.get('/*', frontend.index)

};
