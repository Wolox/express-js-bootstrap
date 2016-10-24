const orm = require('./../orm').models;

exports.getAll = (req, res, next) => {
  orm.models.book.all((err, books) => {

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

  const book = {
    id: req.params.id
  };

  orm.models.book.one(book, (error, b) => {

    if (error) {
      res.status(503);
      res.send({ error });
    } else if (b) {
      res.status(200);
      res.send(b);
    } else {
      res.status(400);
      res.send({ error: 'Invalid book id' });
    }
  });
};
