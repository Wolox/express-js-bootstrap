const errors = require('../errors');

exports.handle = (error, req, res, next) => {
  res.status(error.statusCode || 500);
  res.send({ error: error.message });
};
