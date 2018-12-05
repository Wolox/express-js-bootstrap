const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  graphqlHTTP = require('express-graphql'),
  cors = require('cors'),
  config = require('./config'),
  schema = require('./app/graphql'),
  migrationsManager = require('./migrations'),
  logger = require('./app/logger'),
  DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10,
  DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const init = () => {
  const app = express();
  const port = config.common.port || 8080;
  module.exports = app;

  app.use(cors());

  // Client must send "Content-Type: application/json" header
  app.use(bodyParser.json(bodyParserJsonConfig()));
  app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));

  if (!config.isTesting) {
    morgan.token('req-params', req => req.params);
    app.use(
      morgan(
        '[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status.'
      )
    );
  }

  Promise.resolve()
    .then(() => {
      if (!config.isTesting) {
        return migrationsManager.check();
      }
    })
    .then(() => {
      app.use(
        '/',
        graphqlHTTP(req => ({
          schema,
          graphiql: true
        }))
      );

      app.listen(port);

      logger.info(`Listening on port: ${port}`);
    })
    .catch(logger.error);
};
init();
