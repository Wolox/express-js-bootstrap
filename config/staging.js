exports.setConfig = config => {
  (config.environment = 'staging'), (config.isStage = true);
};
