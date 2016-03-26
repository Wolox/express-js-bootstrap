var orm = require('./../orm').models;

exports.getAll = function (req, res, next) {
    orm.models.book.all(function (err, books) {

        if (err) {
            res.status(503);
            res.send({ error: err.detail });
        } else {
            res.status(200);
            res.send({ books: books });
        }
    });
};

exports.getById = function (req, res, next) {

    var book = {
        id: req.params.id
    };

    orm.models.book.one(book, function (err, b) {

        if (err) {
            res.status(503);
            res.send({ error: err });
        } else if (b) {
            res.status(200);
            res.send(b);
        } else {
            res.status(400);
            res.send({ error: 'Invalid book id' });
        }
    });
};
