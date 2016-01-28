var books = require('./controllers/books'),
    unknownResource = require('./controllers/unknownResource');

exports.init = function (app) {

    // Books
    app.get('/books', [], books.getAll);
    //app.get('/book/:id', [], books.getById);


    // Unknown resource
    app.use(unknownResource.manage);
};
