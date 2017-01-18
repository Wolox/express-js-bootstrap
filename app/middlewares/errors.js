const errors = require('../errors');

exports.handle = (error, req, res, next) => {
  res.status(error.statusCode);
  res.send({ error: error.message });
};
