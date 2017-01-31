const orm = require('./../orm'),
  errors = require('../errors');

exports.getAll = (props, limit = 20, offset = 0) => {
  return orm.models.book.findAll({
    where: props,
    offset,
    limit
  }).catch((err) => {
    throw errors.databaseError(err.detail);
  });
};

exports.getById = (id) => {
  return orm.models.book.findOne({ where: { id } }).catch((err) => {
    throw errors.databaseError(err.detail);
  });
};
