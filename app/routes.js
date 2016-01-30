var books = require('./controllers/books'),
    users = require('./controllers/users'),
    unknownResource = require('./controllers/unknownResource');

exports.init = function (app) {

    // Users
    app.post('/users', [], users.create)

    // Books
    app.get('/books', [], books.getAll);
    //app.get('/book/:id', [], books.getById);

};
