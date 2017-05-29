const Sequelize = require('sequelize'),
  config = require('./../config'),
  models = require('./models/models');

exports.DB_URL = config.common.database.url ||
                `postgres://${config.common.database.username}:${config.common.database.password}@${config.common.database.host}:${config.common.database.port}/${config.common.database.database}`; // eslint-disable-line max-len

exports.init = () => {
  const db = new Sequelize(exports.DB_URL, {
    logging: config.environment === 'development'
  });
  models.define(db);
  exports.models = db.models;
  return config.environment === 'testing' ? Promise.resolve() : db.sync();
};
