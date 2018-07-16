const fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  basename = path.basename(__filename),
  config = require('../../config'),
  dbConfig = require('../../config/db')[config.environment],
  db = { models: {} };

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db.models[model.name] = model;
  });

Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
