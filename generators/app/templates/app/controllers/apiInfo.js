const { merge } = require('lodash');
const pjson = require('../../package.json');

exports.apiInfo = (req, res, next) => {
  try {
    if (!req.body) {
      req.body = {};
    }
    merge(req.body, { apiDate: new Date() });
    merge(req.body, { packageVersion: pjson.version });
    merge(req.body, { nodeVersion: pjson.engines.node });
    return res.status(200).send(req.body);
  } catch (err) {
    return next(err);
  }
};