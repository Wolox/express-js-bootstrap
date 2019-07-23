const pjson = require('../../package.json');

exports.apiInformation = (req, res, next) => {
  try {
    if (!res.headers) {
      res.headers = {};
    }
    res.headers['X-API-Date'] = new Date();
    res.headers['X-Package-Version'] = pjson.version;
    res.headers['X-Node-Version'] = pjson.engines.node;
    return next();
  } catch (err) {
    return next(err);
  }
};
