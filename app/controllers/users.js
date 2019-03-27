'use strict';

const bcrypt = require('bcryptjs'),
  sessionManager = require('./../services/sessionManager'),
  User = require('../models').user,
  errors = require('../errors');

exports.login = (req, res, next) => {
  const user = req.body
    ? {
        username: req.body.username,
        password: req.body.password
      }
    : {};

  User.getByUsername(user.username).then(u => {
    if (u) {
      bcrypt.compare(user.password, u.password).then(isValid => {
        if (isValid) {
          const auth = sessionManager.encode({ username: u.username });

          res.status(200);
          res.set(sessionManager.HEADER_NAME, auth);
          res.send(u);
        } else {
          next(errors.invalidUser);
        }
      });
    } else {
      next(errors.invalidUser);
    }
  });
};

exports.update = (req, res, next) => {
  const update = req.body;
  const user = req.user;
  const props = {
    firstName: update.firstName || user.firstName,
    lastName: update.lastName || user.lastName,
    username: update.username || user.username,
    email: update.email || user.email
  };

  user
    .updateModel(props)
    .then(u => {
      const auth = sessionManager.encode({ username: u.username });

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  const saltRounds = 10;

  const user = req.body
    ? {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
    : {};

  bcrypt
    .hash(user.password, saltRounds)
    .then(hash => {
      user.password = hash;

      User.createModel(user)
        .then(u => {
          res.status(200);
          res.end();
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(errors.defaultError(err));
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
