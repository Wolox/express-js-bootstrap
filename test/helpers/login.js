const chai = require('chai'),
  server = require('../../app'),
  usersFactory = require('../factories/users');

const userAuth = (user, password = '1234') =>
  chai
    .request(server)
    .post('/users/sessions')
    .send({ username: user.username, password });

exports.successfulLogin = () => usersFactory.create({ email: 'default@wolox.com.ar' }).then(userAuth);
