'use strict';

const bcrypt = require('bcrypt'),
  sessionManager = require('./../services/sessionManager'),
  orm = require('./../orm').models;

exports.login = (req, res) => {

  const user = req.body ? {
    username: req.body.username,
    password: req.body.password
  } : {};

  orm.models.user.one({ username: user.username }, (err, u) => {

    if (err) {
      res.status(503);
      res.send({ error: err });
    } else if (u) {
      bcrypt.compare(user.password, u.password).then((isValid) => {
        if (isValid) {
          sessionManager.generateAccessToken(u).then((accessToken) => {
            res.status(200);
            res.send(accessToken);
          });
        } else {
          res.status(400);
          res.send({ error: 'Invalid user' });
        }
      });
    } else {
      res.status(400);
      res.send({ error: 'Invalid user' });
    }
  });
};

exports.invalidateAll = (req, res) => {
  const user = req.user;
  const SALT_ROUNDS = 10;

  bcrypt.genSalt(SALT_ROUNDS).then((verificationCode) => {
    user.verificationCode = verificationCode;
    user.save();
    res.status(200);
    res.end();
  }).catch(() => {
    res.status(500);
    res.end();
  });
};

exports.renew = (req, res) => {

};

exports.update = (req, res) => {
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

exports.logout = (req, res) => {
  res.status(200);
  res.end();
};

exports.loggedUser = (req, res) => {
  res.status(200);
  res.send(req.user);
};

exports.create = (req, res) => {
  const SALT_ROUNDS = 10;

  bcrypt.genSalt(SALT_ROUNDS).then((verificationCode) => {
    const user = req.body ? {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      verificationCode
    } : {};

    bcrypt.hash(user.password, SALT_ROUNDS).then((hash) => {
      user.password = hash;

      orm.models.user.create(user, (err, u) => {

        if (err) {
          res.status(400);
          res.send({ error: err });
        } else {
          res.status(200);
          res.end();
        }
      });
    }).catch((err) => {
      res.status(400);
      res.send({ error: 'Invalid password' });
    });

  }).catch(() => {
    res.status(500);
    res.end();
  });
};
