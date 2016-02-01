
exports.getAll = function (req, res, next) {
    req.models.book.all(function(err, books) {

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

    req.models.book.one(book, function(err, b) {

        if (err) {
            res.status(503);
            res.send({ error: err });
        } else if (!b) {
            res.status(400);
            res.send({ error: 'Invalid book id'});
        } else {
            res.status(200);
            res.send(b);
        }
    });
};
