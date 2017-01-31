const ENVIRONMENT = process.env.NODE_ENV || 'development';

const configFile = `./${ENVIRONMENT}`;

exports.config = require(configFile).config;
