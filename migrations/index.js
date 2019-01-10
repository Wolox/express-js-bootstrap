const Umzug = require('umzug'),
  config = require('./../config/'),
  sequelize = require('../app/models').sequelize,
  logger = require('../app/logger');

exports.check = () => {
  const umzug = new Umzug({
    logging: logger.info,
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor,
        () => {
          throw new Error('Migration tried to use old style "done" callback.upgrade');
        }
      ],
      path: `${__dirname}/migrations`,
      pattern: /\.js$/
    }
  });
  return umzug.pending().then(migrations => {
    if (migrations.length) {
      if (!config.isProduction) {
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
