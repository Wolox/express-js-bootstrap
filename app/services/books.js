const Book = require('../models').book,
  errors = require('../errors');

exports.getAll = (props, limit = 20, offset = 0) => {
  return Book.findAll({
    where: props,
    offset,
    limit
  }).catch(err => {
    throw errors.databaseError(err.detail);
  });
};

exports.getById = id => {
  return Book.findOne({ where: { id } }).catch(err => {
    throw errors.databaseError(err.detail);
  });
};
