exports.setConfig = config => {
  (config.environment = 'production'), (config.isProduction = true);
};
