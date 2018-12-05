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

  Book.associate = function(models) {};

  Book.getAll = (props, limit = 20, offset = 0) => {
    return Book.findAll({
      where: props,
      offset,
      limit
    }).catch(err => {
      throw errors.databaseError(err.detail);
    });
  };

  Book.createModel = book => {
    return Book.create(book).catch(err => {
      throw errors.savingError(err.errors);
    });
  };

  Book.getById = id => {
    return Book.findOne({ where: { id } }).catch(err => {
      throw errors.databaseError(err.detail);
    });
  };

  return Book;
};
