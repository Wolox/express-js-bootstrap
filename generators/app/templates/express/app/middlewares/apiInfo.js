const pjson = require('../../package.json');
const config = require('../../config').common.headers;

exports.apiInformation = (req, res, next) => {
  try {
    if (!res.headers) {
      res.headers = {};
    }
    res.headers[config.apiDate] = new Date();
    res.headers[config.packageVersion] = pjson.version;
    res.headers[config.nodeVersion] = pjson.engines.node;
    return next();
  } catch (err) {
    return next(err);
  }
};
