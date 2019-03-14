/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-empty-function */

const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.associate = function(models) {};

  User.createModel = user => User.create(user).catch(err => {
    // TODO: Implement generic sequelize error handler to avoid huge errors.
    throw errors.savingError(err.errors);
  });

  User.getOne = user => User.findOne({ where: user }).catch(err => {
    throw errors.databaseError(err.detail);
  });

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = function(props) {
    return this.update(props).catch(err => {
      throw errors.savingError(err.errors);
    });
  };

  return User;
};
