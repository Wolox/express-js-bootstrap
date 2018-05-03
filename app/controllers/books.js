const Book = require('../models').book,
  errors = require('../errors');

exports.getAll = (req, res, next) => {
  Book.getAll()
    .then(books => {
      res.status(200);
      res.send({ books });
    })
    .catch(next);
};

exports.getById = (req, res, next) => {
  Book.getById(req.params.id)
    .then(book => {
      if (book) {
        res.status(200);
        res.send(book);
      } else {
        next(errors.bookNotFound);
      }
    })
    .catch(next);
};
