const Sequelize = require('sequelize'),
  utils = require('./utils');

const options = utils.buildDBOptions();

exports.getModel = db => {
  return db.define(
    'book',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: Sequelize.STRING,
      publisher: Sequelize.STRING,
      price: Sequelize.INTEGER,
      link: Sequelize.STRING,
      year: Sequelize.INTEGER
    },
    options
  );
};
