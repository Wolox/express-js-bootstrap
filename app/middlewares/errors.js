const errors = require('../errors'),
  logger = require('../logger');

exports.handle = (error, req, res, next) => {
  logger.error(error);
  res.status(error.statusCode || 500);
  res.send({ error: error.message });
};
