var orm = require('orm'),
    models = require('./../models');

exports.execute = function (DB_URL, cb) {

    orm.connect(DB_URL, function (err, db) {

        if (err) throw err;

        // console.log('Connected to db!');

        models.define(orm, db);

        // add the table to the database
        db.sync(function(err) { 
            if (err) throw err;

            if (cb) {
                cb(db);
            }
        });
    });
};
