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
            res.status(503);
            res.send({ error: err });
        } else if (!u) {
            res.status(400);
            res.send({ error: 'Invalid user'});
        } else {
            var cookie = sessionManager.encodeCookie(u);

            res.status(200);
            res.cookie(sessionManager.COOKIE_NAME, cookie);
            res.send(u);
        }
    });
};

exports.update = function (req, res, next) {
    var update = req.body;
    var user = req.user;

    user.firstName = update.firstName || user.firstName;
    user.lastName = update.lastName || user.lastName;
    user.username = update.username || user.username;
    user.email = update.email || user.email;

    user.save(function(err, u) {
        if (err) {
            res.status(400);
            res.send({ error: err });
        } else {
            var cookie = sessionManager.encodeCookie(u);

            res.status(200);
            res.cookie(sessionManager.COOKIE_NAME, cookie);
            res.send(u);
        }
    });
};

exports.logout = function (req, res, next) {
    res.status(200);
    res.clearCookie(sessionManager.COOKIE_NAME);
    res.end();
};

exports.create = function (req, res, next) {

    var user = req.body;

    if (userHelper.isValid(user)) {

        req.models.user.create(user, function(err, u) {

            if (err) {
                res.status(400);
                res.send({ error: err });
            } else {
                res.status(200);
                res.end();
            }
        });
    } else {
        res.status(400);
        res.send({ error: 'Invalid user'});
    }
};
