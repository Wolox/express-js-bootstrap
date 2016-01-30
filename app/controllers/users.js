var sessionManager = require('./../services/sessionManager'),
    userHelper = require('./../helpers/user');

exports.login = function (req, res, next) {

    var user = req.query;

    if (user) {
        user = {
            username: user.username,
            password: user.password
        };
    }

    req.models.user.one(user, function(err, u) {

        if (err) {
            res.status(503)
            res.send({ error: err.msg });
        } else if (!u) {
            res.status(400);
            res.send({ error: 'Invalid user'});
        } else {
            delete u.password;
            var cookie = sessionManager.encodeCookie(u);

            res.cookie(sessionManager.COOKIE_NAME, cookie);
            res.status(200);
            res.send(u);
        }
    });
};

exports.logout = function (req, res, next) {
    res.clearCookie(sessionManager.COOKIE_NAME);
    res.status(200);
    res.end();
};

exports.create = function (req, res, next) {

    var user = req.body;

    if (userHelper.isValid(user)) {

        req.models.user.create(user, function(err, u) {

            if (err) {
                res.status(400)
                res.send({ error: err.msg });
            } else {
                res.status(200);
                res.send(u);
            }
        });
    } else {
        res.status(400);
        res.send({ error: 'Invalid user'});
    }
};
