const orm = require('./../orm').models,
  errors = require('../errors');

exports.create = (user) => {
  return orm.models.user.createAsync(user).catch((err) => {
    throw errors.savingError(err);
  });
};

exports.getOne = (user) => {
  return orm.models.user.oneAsync(user).catch((err) => {
    throw errors.databaseError(err.detail);
  });
};

exports.getByUsername = (username) => {
  return exports.getOne({ username });
};

exports.update = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, u) => {
      if (err) {
        reject(err);
      } else {
        resolve(u);
      }
    });
  }).catch((err) => {
    throw errors.savingError(err);
  });
};
