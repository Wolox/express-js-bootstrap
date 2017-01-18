const bookService = require('../services/books');

exports.getAll = (req, res, next) => {
  bookService.getAll((err, books) => {
    if (err) {
      res.status(503);
      res.send({ error: err.detail });
    } else {
      res.status(200);
      res.send({ books });
    }
  });
};

exports.getById = (req, res, next) => {
  bookService.getById(req.params.id, (err, b) => {
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
