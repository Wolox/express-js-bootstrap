const Umzug = require('umzug'),
  Sequelize = require('sequelize'),
  config = require('./../config/'),
  orm = require('../app/orm'),
  errors = require('../app/errors');

exports.check = () => {
  const db = new Sequelize(orm.DB_URL, {
    logging: config.environment.isDevelopment
  });
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db
    },
    migrations: {
      params: [
        db.getQueryInterface(),
        db.constructor,
        function () {
          throw new Error('Migration tried to use old style "done" callback.upgrade');
        }
      ],
      path: './migrations/migrations',
      pattern: /\.js$/
    }
  });
  return umzug.pending().then((migrations) => {
    if (migrations.length) {
      throw new Error('Pending migrations, run: npm run migrations');
    }
  });
};
