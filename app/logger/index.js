const winston = require('winston'),
  fs = require('fs'),
  config = require('../../config'),
  logDir = `${__dirname}/logs`;
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
  fs.mkdirSync(`${logDir}/history`);
}

const tsFormat = () => new Date().toLocaleTimeString();
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: 'complete',
      filename: `${logDir}/complete.log`,
      timestamp: tsFormat,
      json: false,
      colorize: false,
      prettyPrint: true
    }),
    new winston.transports.File({
      name: 'errors',
      filename: `${logDir}/errors.log`,
      timestamp: tsFormat,
      colorize: false,
      json: false,
      level: 'error',
      prettyPrint: true,
      handleExceptions: config.loggerHandlesExceptions,
      humanReadableUnhandledException: config.loggerHandlesExceptions
    })
  ]
});

if (!config.isTesting) {
  logger.add(
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: false,
      prettyPrint: true
    })
  );
}

logger.add(
  new winston.transports.DailyRotateFile({
    filename: `${logDir}/history/-results.log`,
    timestamp: tsFormat,
    datePattern: 'yyyy-MM-dd.',
    colorize: false,
    prepend: true,
    json: false,
    level: 'info',
    prettyPrint: true
  })
);

module.exports = logger;
