var fs = require('fs'),
    path = require('path'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    DB_URL = require('./../app/orm').DB_URL,
    tableCreation = require('./../app/models/scripts/tableCreation'),
    dataCreation = require('./../app/models/scripts/dataCreation');

chai.use(chaiHttp);

var database;

beforeEach('create tables and populate sample data', function (done) {
    tableCreation.execute(DB_URL, function (db) {
        database = db;
        dataCreation.execute(db, function () {
            done();
        });
    });
});

afterEach('delete tables and sample data', function (done) {
    database.drop(function () {
        done();
    });
});

// including all test files
var normalizedPath = path.join(__dirname, '.');
fs.readdirSync(normalizedPath).forEach(function (file) {
    require('./' + file);
});
