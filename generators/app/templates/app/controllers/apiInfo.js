const { merge } = require('lodash');
const pjson = require('../../package.json');

exports.apiInfo = (req, res, next) => {
  try {
    return res.status(200).send(res.headers);
  } catch (err) {
    return next(err);
  }
};

exports.dependenciesInfo = (req, res) => {
  try {
    if (!req.body) {
      req.body = {};
    }
    merge(req.body, { dependencies: pjson.dependencies });
    return res.status(200).send(req.body);
  } catch (err) {
    return res.status(400).send('There was a problem to get API info');
  }
};
