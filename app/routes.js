const m = require('./middlewares'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  unknownResource = require('./controllers/unknownResource');

exports.init = (app) => {

  // Users
  app.get('/login', [], users.login);
  app.get('/users/me', [m.secure], users.loggedUser);
  app.put('/users', [m.secure], users.update);
  app.post('/users', [], users.create);
  app.post('/logout', [m.secure], users.logout);

  // Books
  app.get('/books', [], books.getAll);
  app.get('/books/:id', [], books.getById);

};
