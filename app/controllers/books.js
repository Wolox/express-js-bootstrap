const bookService = require('../services/books'),
  errors = require('../errors');

exports.getAll = (req, res, next) => {
  bookService.getAll((err, books) => {
    if (err) {
      next(errors.databaseError(err.detail));
    } else {
      res.status(200);
      res.send({ books });
    }
  });
};

exports.getById = (req, res, next) => {
  bookService.getById(req.params.id, (err, book) => {
    if (err) {
      next(errors.databaseError(err.detail));
    } else if (book) {
      res.status(200);
      res.send(book);
    } else {
      next(errors.bookNotFound)
    }
  });
};
