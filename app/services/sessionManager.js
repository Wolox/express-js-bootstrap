var jwt = require('jwt-simple');

var COOKIE_NAME = 'Authorization';
var SECRET = 'secretX';

exports.COOKIE_NAME = COOKIE_NAME;

exports.encodeCookie = function (cookie) {
    return jwt.encode(cookie, SECRET);
};

exports.decodeCookie = function (cookie) {
    return jwt.decode(cookie, SECRET);
};
