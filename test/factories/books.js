const factoryGirl = require('factory-girl'),
  factory = factoryGirl.factory,
  SequelizeAdapter = new factoryGirl.SequelizeAdapter(),
  Book = require('../../app/models').book;

factory.setAdapter(SequelizeAdapter);

factory.define('Book', Book, {
  name: factory.seq('Book.name', n => `book ${n}`)
});

exports.create = (options = {}) => factory.create('Book', options, {});

exports.createMultiple = num => factory.createMany('Book', num);

exports.build = (options = {}) => factory.build('Book', options, {});

exports.factory = factory;
