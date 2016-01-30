var jwt = require('jwt-simple');

exports.secure = function (req, res, next) {
    var authorization = req.cookies.Authorization;
    // check for valid token
    if (authorization) {
        next();
    } else {
        res.status(401);
    }
}