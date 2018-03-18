const errors = require('../errors'),
  logger = require('../logger');

const statusCodes = {
  [errors.INVALID_USER]: 400,
  [errors.BOOK_NOT_FOUND]: 404,
  [errors.SAVING_ERROR]: 400,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  const statusCode = statusCodes[error.internalCode];
  if (statusCode) {
    res.status(statusCode);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(500);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
