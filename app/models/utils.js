const config = require('./../../config/');

exports.buildDBOptions = () => {
  const options = {
    freezeTableName: true,
    paranoid: true,
    underscored: true
  };

  if (!config.isTesting) {
    options.schema = config.common.database.schema;
  }

  return options;
};
