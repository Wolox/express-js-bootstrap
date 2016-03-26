var sessionManager = require('./services/sessionManager'),
    orm = require('./orm').models;

exports.secure = function (req, res, next) {
    var auth = req.headers[sessionManager.HEADER_NAME];

    if (auth) {
        var user = sessionManager.decode(auth);

        orm.models.user.one(user, function (err, u) {

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
