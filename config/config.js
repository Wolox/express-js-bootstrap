const ENVIRONMENT = process.env.NODE_ENV || 'staging';

const configFile = `./${ENVIRONMENT}`;

exports.config = require(configFile).config;
