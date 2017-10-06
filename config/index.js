const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => {
  return variable instanceof Object;
};

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
*/
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
    return target;
  }
};

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
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENV
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
