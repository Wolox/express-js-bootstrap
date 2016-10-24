'use strict';

const sessionManager = require('./../services/sessionManager'),
  orm = require('./../orm').models;

exports.login = (req, res, next) => {

  let user = req.query;
  if (user) {
    user = {
      username: user.username,
      password: user.password
    };
  }

  orm.models.user.one(user, (err, u) => {

    if (err) {
      res.status(503);
      res.send({ error: err });
    } else if (u) {
      const auth = sessionManager.encode(u);

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    } else {
      res.status(400);
      res.send({ error: 'Invalid user' });
    }
  });
};

exports.update = (req, res, next) => {
  const update = req.body;
  const user = req.user;

  user.firstName = update.firstName || user.firstName;
  user.lastName = update.lastName || user.lastName;
  user.username = update.username || user.username;
  user.email = update.email || user.email;

  user.save((err, u) => {
    if (err) {
      res.status(400);
      res.send({ error: err });
    } else {
      const auth = sessionManager.encode(u);

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    }
  });
};

exports.logout = (req, res, next) => {
  res.status(200);
  res.end();
};

exports.loggedUser = (req, res, next) => {
  res.status(200);
  res.send(req.user);
};

exports.create = (req, res, next) => {

  let user = req.body;

  if (user) {
    user = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email
    };
  }

  orm.models.user.create(user, (err, u) => {

    if (err) {
      res.status(400);
      res.send({ error: err });
    } else {
      res.status(200);
      res.end();
    }
  });
};
