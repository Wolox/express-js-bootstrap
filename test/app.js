'use strict';

const fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  DB_URL = require('./../app/orm').DB_URL,
  tableCreation = require('./../app/models/scripts/tableCreation'),
  dataCreation = require('./../app/models/scripts/dataCreation');

chai.use(chaiHttp);

let database;

beforeEach('create tables and populate sample data', (done) => {
  tableCreation.execute(DB_URL, (db) => {
    database = db;
    dataCreation.execute(db, () => {
      done();
    });
  });
});

afterEach('delete tables and sample data', (done) => {
  database.drop(() => {
    done();
  });
});

// including all test files
const normalizedPath = path.join(__dirname, '.');
fs.readdirSync(normalizedPath).forEach((file) => {
  require(`./${file}`);
});
