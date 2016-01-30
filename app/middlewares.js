var jwt = require('jwt-simple');

exports.secure = function (req, res, next) {
    var authorization = req.cookies.Authorization;

    if (authorization) {
        var user = jwt.decode(authorization, 'secret');

        req.models.user.one(user, function(err, u) {

            if (u) {
                next();
            } else {
                res.status(401);
                res.end();
            }
        });
    } else {
        res.status(401);
        res.end();
    }
}