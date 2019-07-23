const { merge } = require('lodash');
const pjson = require('../../package.json');

exports.apiInformation = (req, res, next) => {
  try {
    if (!res.headers) {
      res.headers = {};
    }
    merge(res.headers, { 'X-API-Date': new Date() });
    merge(res.headers, { 'X-Package-Version': pjson.version });
    merge(res.headers, { 'X-Node-Version': pjson.engines.node });
    return next();
  } catch (err) {
    return next(err);
  }
};
