const moment = require('moment'),
  sessionManager = require('./services/sessionManager'),
  orm = require('./orm').models;

exports.secure = (req, res, next) => {
  const auth = req.headers[sessionManager.HEADER_NAME];

  if (auth) {
    const accessToken = sessionManager.decode(auth);

    orm.models.user.one({ id : accessToken.id }, (err, u) => {

      if (moment().isAfter(accessToken.expirationDateWarning) && moment().isBefore(accessToken.expirationDate)) {
        res.set(sessionManager.WARNING_HEADER_NAME, true);
      }

      if (u && u.verificationCode === accessToken.verificationCode && moment().isBefore(accessToken.expirationDate)) {
        req.user = u;
        req.accessToken = accessToken;
        next();
      } else {
        res.status(401);
        res.end();
      }
    });
  } else {
    res.status(401);
    res.end();
  }
};
