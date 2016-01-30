var sessionManager = require('./services/sessionManager');

exports.secure = function (req, res, next) {
    var cookie = req.cookies[sessionManager.COOKIE_NAME];

    if (cookie) {
        var user = sessionManager.decodeCookie(cookie);

        req.models.user.one(user, function(err, u) {

            if (u) {
                req.user = u;
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
};
