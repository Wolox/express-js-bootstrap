module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
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
        year: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        deleted_at: Sequelize.DATE
      },
      {
        schema: process.env.NODE_API_DB_SCHEMA
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('book', { schema: process.env.NODE_API_DB_SCHEMA });
  }
};
