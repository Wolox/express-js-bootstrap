const config = require('../config').common.database;

module.exports = {
  development: {
    username: 'onboarding-digital',
    password: 'onboarding-digital',
    database: 'onboarding-digital-development',
    host: config.host,
    dialect: 'postgres',
    logging: true
  },
  testing: {
    username: 'onboarding-digital',
    password: 'onboarding-digital',
    database: 'onboarding-digital-testing',
    host: config.host,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'postgres',
    logging: false
  }
};
