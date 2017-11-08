const Umzug = require('umzug'),
  Sequelize = require('sequelize'),
  config = require('./../config/'),
  orm = require('../app/orm'),
  logger = require('../app/logger'),
  errors = require('../app/errors');

exports.check = () => {
  const db = new Sequelize(orm.DB_URL, {
    logging: config.isDevelopment ? logger.info : false
  });
  const umzug = new Umzug({
    logging: logger.info,
    storage: 'sequelize',
    storageOptions: {
      sequelize: db
    },
    migrations: {
      params: [
        db.getQueryInterface(),
        db.constructor,
        function() {
          throw new Error('Migration tried to use old style "done" callback.upgrade');
        }
      ],
      path: './migrations/migrations',
      pattern: /\.js$/
    }
  });
  return umzug.pending().then(migrations => {
    if (migrations.length) {
      if (config.isDevelopment) {
        return Promise.reject('Pending migrations, run: npm run migrations');
      } else {
        return umzug.up().catch(err => {
          logger.error(err);
          return Promise.reject('There are pending migrations that could not be executed');
        });
      }
    }
  });
};
