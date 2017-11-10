const Sequelize = require('sequelize'),
  config = require('./../config'),
  models = require('./models');

exports.DB_URL =
  config.common.database.url ||
  `postgres://${config.common.database.username}:${config.common.database.password}@${config.common.database
    .host}:${config.common.database.port}/${config.common.database.name}`; // eslint-disable-line max-len

exports.init = () => {
  const db = new Sequelize(exports.DB_URL, {
    logging: config.isDevelopment
  });
  models.define(db);
  exports.models = db.models;
  return config.isTesting ? Promise.resolve() : db.sync();
};
