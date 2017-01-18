const Promise = require('bluebird')

exports.getModel = (orm, db) => {
  const book = db.define('book', {
    name      :     { type: 'text', required: true },
    author    :     { type: 'text' },
    publisher :     { type: 'text' },
    price     :     { type: 'number' },
    link      :     { type: 'text' },
    year      :     { type: 'integer' }
  });
  return Promise.promisifyAll(book);
};
