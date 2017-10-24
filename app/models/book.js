const Sequelize = require('sequelize'),
  config = require('./../../config/');

const options = {
  freezeTableName: true,
  paranoid: true,
  underscored: true
};

if (!config.isTesting) {
  options.schema = config.common.database.schema;
}

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
