const jwt = require('jwt-simple'),
  config = require('./../../config');

const SECRET = config.common.session.secret;

exports.HEADER_NAME = config.common.session.header_name;

exports.encode = toEncode => {
  return jwt.encode(toEncode, SECRET);
};

exports.decode = toDecode => {
  return jwt.decode(toDecode, SECRET);
};
