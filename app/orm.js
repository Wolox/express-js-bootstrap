var orm = require('orm');

var connection = null;

function setupModels(db) {
    var Book  = db.define('book', {
        name      :     { type: 'text', required: true },
        author    :     { type: 'text' },
        publisher :     { type: 'text' },
        price     :     { type: 'number' },
        link      :     { type: 'text' },
        year      :     { type: 'integer' }
    });
    var User = db.define('user', {
        firstName   :   { type: 'text', required: true },
        lastName    :   { type: 'text', required: true },
        username    :   { type: 'text', required: true },
        email       :   { type: 'text', required: true },
        password    :   { type: 'text', required: true }
    }, {
        validations: {
            username    :   orm.enforce.unique('username already taken!'),
            email       :   orm.enforce.unique('email already taken!') 
        }
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
