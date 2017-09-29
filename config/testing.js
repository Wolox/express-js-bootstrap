exports.setConfig = config => {
  (config.environment = 'testing'), (config.isTesting = true);
  config.common.database.url = process.env.NODE_API_DB_URL_TEST;
};
