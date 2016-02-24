var ENVIRONMENT = process.env.NODE_ENV || 'staging';

var configFile = './' + ENVIRONMENT;

exports.config = require(configFile).config;
