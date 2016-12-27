const orm = require('orm'),
  config = require('./../config/config').config,
  tableCreation = require('./models/scripts/tableCreation'),
  models = require('./models/models');

const DB_URL = config.common.database.url ||
                `postgres://${config.common.database.username}:${config.common.database.password}@${config.common.database.host}:${config.common.database.port}/${config.common.database.database}`; // eslint-disable-line max-len
const dbModels = {};

exports.init = (app) => {
  if (config.environment !== 'testing') {
    tableCreation.execute(DB_URL);
  }

  app.use((req, res, next) => {

    orm.connect(DB_URL, function (err, db) {
      if (err) {
        throw err;
      }

      models.define(orm, db);
      dbModels.models = db.models;
      next();
    });
  });
};

exports.models = dbModels;
exports.DB_URL = DB_URL;
