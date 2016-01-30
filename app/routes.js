var m = require('./middlewares'),
    books = require('./controllers/books'),
    users = require('./controllers/users'),
    unknownResource = require('./controllers/unknownResource');

exports.init = function (app) {

    // Users
    app.get('/login', [], users.login);
    app.post('/users', [], users.create);
    app.post('/logout', [m.secure], users.logout);

    // Books
    app.get('/books', [], books.getAll);
    //app.get('/book/:id', [], books.getById);

};
