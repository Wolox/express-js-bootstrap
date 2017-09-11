exports.setConfig = config => {
  (config.environment = 'development'), (config.isDevelopment = true);
};
