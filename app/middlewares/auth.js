const sessionManager = require('./../services/sessionManager'),
  errors = require('../errors'),
  User = require('../models').user;

exports.secure = (req, res, next) => {
  const auth = req.headers[sessionManager.HEADER_NAME];

  if (auth) {
    const payload = sessionManager.decode(auth);

    return User.findOne({ where: payload }).then(user => {
      if (user) {
        req.user = user;
        return next();
      }
      next(errors.invalidAuthentication);
    });
  } else {
    next(errors.invalidAuthentication);
  }
};
