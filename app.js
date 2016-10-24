const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  config = require('./config/config').config,
  routes = require('./app/routes'),
  orm = require('./app/orm');

const init = () => {
  const app = express();
  module.exports = app;

  // Client must send "Content-Type: application/json" header
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  morgan.token('req-params', (req) => req.params);
  app.use(morgan('[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status.'));

  orm.init(app);

  routes.init(app);

  app.listen(config.common.port || 8080);
};

init();
