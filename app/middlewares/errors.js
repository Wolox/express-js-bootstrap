const errors = require('../errors');

exports.handle = (error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(500);
  }
  return res.send({ error: error.message });
};
