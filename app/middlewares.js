const sessionManager = require('./services/sessionManager'),
  orm = require('./orm').models;

exports.secure = (req, res, next) => {
  const auth = req.headers[sessionManager.HEADER_NAME];

  if (auth) {
    const user = sessionManager.decode(auth);

    orm.models.user.one(user, (err, u) => {

      if (u) {
        req.user = u;
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
