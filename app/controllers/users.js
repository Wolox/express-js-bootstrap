var User = require('./../models/users');

exports.create = function (req, res, next) {

    var user = req.body;
    if (User.isValid(user)) {

        req.models.user.create(user, function(err, u) {

            if (err) {
                res.status(503)
                res.send({ status: 503, error: err.msg });
            } else {
                res.status(200);
                res.send(u);
            }
        });
    } else {
        res.status(403);
        res.send({ status: 403, error: 'Invalid user'});
    }
};
