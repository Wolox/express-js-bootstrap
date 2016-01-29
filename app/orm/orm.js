var orm = require('orm');

var connection = null;

function setupModels(db) {
    var Book  = db.define("book", {
        name      : String,
        author    : String,
        year      : Number // FLOAT
    });
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
            setupModels(db);
            req.db = db;
            req.models = db.models;
            next();
        });
    });
};
