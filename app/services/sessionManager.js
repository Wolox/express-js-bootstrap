var jwt = require('jwt-simple');

var HEADER_NAME = 'authorization';
var SECRET = 'secretX';

exports.HEADER_NAME = HEADER_NAME;

exports.encode = function (toEncode) {
    return jwt.encode(toEncode, SECRET);
};

exports.decode = function (toDecode) {
    return jwt.decode(toDecode, SECRET);
};
