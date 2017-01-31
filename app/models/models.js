const book = require('./book'),
  user = require('./user');

exports.define = (db) => {
  book.getModel(db);
  user.getModel(db);
};
