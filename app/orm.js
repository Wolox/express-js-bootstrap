var orm = require('orm'),
    Book = require('./models/book'),
    User = require('./models/user');

var connection = null;

function setupModels(orm, db) {
    var book  = Book.getModel(orm, db);
    var user = User.getModel(orm, db);
}

exports.init = function (app) {

    app.use(function (req, res, next) {

        if (connection) {
            req.db = connection;
            req.models = connection.models;
            next();
        }

        orm.connect('postgres://michelagopian:@127.0.0.1:5432/books', function (err, db) {
            if (err) {
                throw err;
            }

            connection = db;
            setupModels(orm, db);
            req.db = db;
            req.models = db.models;
            next();
        });
    });
};
