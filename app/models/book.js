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
      underscored: true,
      classMethods: {
        associate: models => {}
      }
    }
  );
  return Book;
};
