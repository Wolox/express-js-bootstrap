const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'book',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      author: DataTypes.STRING,
      publisher: DataTypes.STRING,
      price: DataTypes.INTEGER,
      link: DataTypes.STRING,
      year: DataTypes.INTEGER
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  /* eslint-disable no-empty-function*/
  Book.associate = function associate() {};
  /* eslint-enable no-empty-function*/

  Book.getAll = (props, limit = 20, offset = 0) => Book.findAll({
    where: props,
    offset,
    limit
  }).catch(err => {
    throw errors.databaseError(err.detail);
  });

  Book.getById = id => Book.findOne({ where: { id } }).catch(err => {
    throw errors.databaseError(err.detail);
  });

  return Book;
};
