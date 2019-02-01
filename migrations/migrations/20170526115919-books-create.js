module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
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
    year: Sequelize.INTEGER,
    /* eslint-disable camelcase */
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
    /* eslint-enable camelcase */
  }),

  down: queryInterface => queryInterface.dropTable('books')
};
