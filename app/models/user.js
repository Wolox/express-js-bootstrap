const Sequelize = require('sequelize'),
  config = require('./../../config/');

const options = {
  freezeTableName: true,
  paranoid: true,
  underscored: true
};

if (!config.isTesting) {
  options.schema = config.common.database.schema;
};

exports.getModel = db => {
  return db.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, options
  );
};
