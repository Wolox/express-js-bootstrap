const orm = require('./../orm').models;

exports.getAll = (cb) => {
  orm.models.book.all((err, books) => {
    if (cb) {
      cb(err, books);
    }
  });
};

exports.getById = (id, cb) => {
  orm.models.book.one({ id }, (err, book) => {
    if (cb) {
      cb(err, book)
    }
  });
};
