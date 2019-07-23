const { merge } = require('lodash');
const pjson = require('../../package.json');

exports.apiInformation = (req, res, next) => {
  try {
    if (!req.body) {
      req.body = {};
    }
    merge(req.body, { apiDate: new Date() });
    merge(req.body, { packageVersion: pjson.version });
    merge(req.body, { nodeVersion: pjson.engines.node });
    return next();
  } catch (err) {
    return next(err);
  }
};
