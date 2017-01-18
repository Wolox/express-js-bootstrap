const orm = require('./../orm').models;

exports.create = (user, cb) => {
  orm.models.user.create(user, (err, u) => {
    if (cb) {
      cb(err, u);
    }
  });
};

exports.getOne = (user, cb) => {
  orm.models.user.one(user, (err, u) => {
    if (cb) {
      cb(err, u);
    }
  });
};

exports.getByUsername = (username, cb) => {
  exports.getOne({ username }, cb);
};
