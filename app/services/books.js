const orm = require('./../orm').models,
  errors = require('../errors');

exports.getAll = (cb) => {
  return orm.models.book.allAsync().catch((err) => {
    throw errors.databaseError(err.detail);
  });
};

exports.getById = (id) => {
  return orm.models.book.oneAsync({ id }).catch((err) => {
    throw errors.databaseError(err.detail);
  });
};
