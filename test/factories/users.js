const factoryGirl = require('factory-girl'),
  factory = factoryGirl.factory,
  SequelizeAdapter = new factoryGirl.SequelizeAdapter(),
  User = require('../../app/models').user,
  bcrypt = require('bcryptjs');

factory.setAdapter(SequelizeAdapter);

factory.define('User', User, {
  firstName: factory.seq('User.firstName', n => `name ${n}`),
  lastName: factory.seq('User.lastName', n => `last ${n}`),
  username: factory.seq('User.username', n => `username ${n}`),
  email: factory.seq('User.email', n => `auto${n}@wolox.com.ar`),
  password: () => bcrypt.hash('1234567a', 10)
});

exports.create = (options = {}) => factory.create('User', options, {});

exports.createMultiple = num => factory.createMany('User', num);

exports.build = (options = {}) => factory.build('User', options, {});

exports.factory = factory;
