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

  /* eslint-disable no-empty-function*/
  User.associate = function associate() {};
  /* eslint-enable no-empty-function*/

  User.createModel = user =>
    User.create(user).catch(err => {
      // TODO: Implement generic sequelize error handler to avoid huge errors.
      throw errors.savingError(err.errors);
    });

  User.getOne = user => User.findOne({ where: user }).catch(err => {
    throw errors.databaseError(err.detail);
  });

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = function updateModel (props) {
    return this.update(props).catch(err => {
      throw errors.savingError(err.errors);
    });
  };

  return User;
};
