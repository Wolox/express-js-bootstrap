const express = require('express'),
  bodyParser = require('body-parser'),
  rollbar = require('rollbar'),
  morgan = require('morgan'),
  path = require('path'),
  config = require('./config/config').config,
  routes = require('./app/routes'),
  orm = require('./app/orm'),
  errors = require('./app/middlewares/errors');

const init = () => {
  const app = express();
  const port = config.common.port || 8080;
  module.exports = app;

  // Client must send "Content-Type: application/json" header
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (config.environment !== 'testing') {
    morgan.token('req-params', (req) => req.params);
    app.use(morgan('[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status.'));
  }

  // View engine setup
  app.set('views', path.join(`${__dirname}/app`, 'views'));
  app.set('view engine', 'jade');

  app.use(express.static(path.join(`${__dirname}/app`, 'dist')));

  orm.init(app);

  routes.init(app);

  app.use(errors.handle);
  app.use(rollbar.errorHandler(config.common.rollbar.accessToken, {
    enabled: !!config.common.rollbar.accessToken,
    environment: config.environment
  }));

  app.listen(port);
  console.log(`Listening on port: ${port}`); // eslint-disable-line
};

init();
