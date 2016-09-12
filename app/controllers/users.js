var sessionManager = require('./../services/sessionManager'),
  orm = require('./../orm').models;

exports.login = function (req, res, next) {

  var user = req.query;

  if (user) {
    user = {
      username: user.username,
      password: user.password
    };
  }

  orm.models.user.one(user, function (err, u) {

    if (err) {
      res.status(503);
      res.send({ error: err });
    } else if (u) {
      var auth = sessionManager.encode(u);

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    } else {
      res.status(400);
      res.send({ error: 'Invalid user' });
    }
  });
};

exports.update = function (req, res, next) {
  var update = req.body;
  var user = req.user;

  user.firstName = update.firstName || user.firstName;
  user.lastName = update.lastName || user.lastName;
  user.username = update.username || user.username;
  user.email = update.email || user.email;

  user.save(function (err, u) {
    if (err) {
      res.status(400);
      res.send({ error: err });
    } else {
      var auth = sessionManager.encode(u);

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    }
  });
};

exports.logout = function (req, res, next) {
  res.status(200);
  res.end();
};

exports.loggedUser = function (req, res, next) {
  res.status(200);
  res.send(req.user);
};

exports.create = function (req, res, next) {

  var user = req.body;

  if (user) {
    user = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email
    };
  }

  orm.models.user.create(user, function (err, u) {

    if (err) {
      res.status(400);
      res.send({ error: err });
    } else {
      res.status(200);
      res.end();
    }
  });
};
