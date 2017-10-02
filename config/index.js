const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const configFile = `./${ENVIRONMENT}`;

const config = {
  common: {
    database: {
      url: process.env.NODE_API_DB_URL,
      host: process.env.NODE_API_DB_HOST,
      port: process.env.NODE_API_DB_PORT,
      name: process.env.NODE_API_DB_NAME,
      username: process.env.NODE_API_DB_USERNAME,
      password: process.env.NODE_API_DB_PASSWORD
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET
    },
    rollbar: {
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN
    }
  }
};

require(configFile).setConfig(config);
module.exports = config;
