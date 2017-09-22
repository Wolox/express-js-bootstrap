'use strict';

const fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  Sequelize = require('sequelize'),
  models = require('../app/models'),
  orm = require('./../app/orm'),
  dataCreation = require('./../app/models/scripts/dataCreation');

chai.use(chaiHttp);

const db = new Sequelize(orm.DB_URL, { logging: false });

beforeEach('drop tables, re-create them and populate sample data', done => {
  models.define(db);
  db
    .sync({ force: true })
    .then(() => dataCreation.execute(db))
    .then(() => {
      exports.models = db.models;
      done();
    });
});

// including all test files
const normalizedPath = path.join(__dirname, '.');
fs.readdirSync(normalizedPath).forEach(file => {
  require(`./${file}`);
});
