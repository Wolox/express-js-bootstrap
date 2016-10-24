const orm = require('orm'),
  models = require('./../models');

exports.execute = (DB_URL, cb) => {

  orm.connect(DB_URL, (err, db) => {

    if (err) {
      throw err;
    }

    // console.log('Connected to db!');

    models.define(orm, db);

    // add the table to the database
    db.sync((syncErr) => {
      if (syncErr) {
        throw syncErr;
      }

      if (cb) {
        cb(db);
      }
    });
  });
};
