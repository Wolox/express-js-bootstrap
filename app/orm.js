var orm = require('orm'),
    config = require('./../config/config').config,
    tableCreation = require('./models/scripts/tableCreation'),
    Book = require('./models/book'),
    User = require('./models/user');

function setupModels(orm, db) {
    var book  = Book.getModel(orm, db);
    var user = User.getModel(orm, db);
}

var DB_URL = config.common.database.url ||
                ('postgres://' + config.common.database.username + ':' + config.common.database.password +
                '@' + config.common.database.host + ':' + config.common.database.port +
                '/' + config.common.database.database);
var models = {};

exports.init = function (app) {

    tableCreation.execute(DB_URL);

    app.use(function (req, res, next) {

        orm.connect(DB_URL, function (err, db) {
            if (err) {
                throw err;
            }

            setupModels(orm, db);
            models.models = db.models;
            next();
        });
    });
};

exports.models = models;
