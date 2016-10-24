const bookModel = require('./book'),
  userModel = require('./user');

exports.define = (orm, db) => {
  bookModel.getModel(orm, db);
  userModel.getModel(orm, db);
};
