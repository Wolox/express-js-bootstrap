var jwt = require('jwt-simple'),
    userHelper = require('./../helpers/users');

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
            var token = jwt.encode(u, 'secret');
            res.cookie('Authorization', token);
            res.status(200);
            res.send(u);
        }
    });
};

exports.logout = function (req, res, next) {
    res.clearCookie('Authorization');
    res.status(200);
    res.end();
};

exports.create = function (req, res, next) {

    var user = req.body;
    if (userHelper.isValid(user)) {

        req.models.user.create(user, function(err, u) {

            if (err) {
                res.status(503)
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
