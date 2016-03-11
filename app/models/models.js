var bookModel = require('./book'),
    userModel = require('./user');

exports.define = function (orm, db) {
    bookModel.getModel(orm, db);
    userModel.getModel(orm, db);
};
