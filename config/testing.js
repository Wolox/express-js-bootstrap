exports.setConfig = config => {
  (config.environment = 'testing'), (config.isTesting = true);
  config.common.database.database = process.env.NODE_API_DB_NAME_TEST;
};
