var jwt = require('jwt-simple'),
    config = require('./../../config/config').config;

var SECRET = config.common.session.secret;

exports.HEADER_NAME = config.common.session.header_name;

exports.encode = function (toEncode) {
    return jwt.encode(toEncode, SECRET);
};

exports.decode = function (toDecode) {
    return jwt.decode(toDecode, SECRET);
};
