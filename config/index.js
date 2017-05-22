const ENVIRONMENT = process.env.NODE_ENV || 'development';

const configFile = `./${ENVIRONMENT}`;

module.exports = require(configFile).config;
