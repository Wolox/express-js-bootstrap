const config = require('./../config');

module.exports = {
  [config.environment]: Object.assign({}, config.common.database, {
    dialect: 'postgres'
  })
};
