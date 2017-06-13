const orm = require('./../orm'),
  errors = require('../errors');

exports.create = user => {
  return orm.models.user.create(user).catch(err => {
    throw errors.savingError(err.errors);
  });
};

exports.getOne = user => {
  return orm.models.user.findOne({ where: user }).catch(err => {
    throw errors.databaseError(err.detail);
  });
};

exports.getByUsername = username => {
  return exports.getOne({ username });
};

exports.update = (props, user) => {
  return user.update(props).catch(err => {
    throw errors.savingError(err.errors);
  });
};
