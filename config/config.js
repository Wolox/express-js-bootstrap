var ENVIRONMENT = process.env.ENV || 'production';

var configFile = './' + ENVIRONMENT;

exports.config = require(configFile).config;
