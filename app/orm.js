var orm = require('orm'),
    Book = require('./models/book'),
    User = require('./models/user');

function setupModels(orm, db) {
    var book  = Book.getModel(orm, db);
    var user = User.getModel(orm, db);
}

exports.init = function (app) {

    app.use(function (req, res, next) {

        orm.connect('postgres://michelagopian:@127.0.0.1:5432/books', function (err, db) {
            if (err) {
                throw err;
            }

            setupModels(orm, db);
            req.models = db.models;
            next();
        });
    });
};
