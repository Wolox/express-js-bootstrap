const Promise = require('bluebird')

exports.getModel = (orm, db) => {
  const person = db.define('user', {
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
  return Promise.promisifyAll(person);
};
