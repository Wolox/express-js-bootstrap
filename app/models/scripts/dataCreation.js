const bcrypt = require('bcrypt');

exports.execute = (db) => {
  const data = [];

  data.push(db.models.book.create({ name: 'book 1' }));
  data.push(db.models.book.create({ name: 'book 2' }));
  data.push(db.models.book.create({ name: 'book 3' }));

  data.push(bcrypt.hash('1234', 10).then((hash) => {
    const users = [];
    users.push(db.models.user.create({
      firstName: 'firstName1',
      lastName: 'lastName1',
      username: 'username1',
      email: 'email1@gmail.com',
      password: hash
    }));
    users.push(db.models.user.create({
      firstName: 'firstName2',
      lastName: 'lastName2',
      username: 'username2',
      email: 'email2@gmail.com',
      password: hash
    }));
    users.push(db.models.user.create({
      firstName: 'firstName3',
      lastName: 'lastName3',
      username: 'username3',
      email: 'email3@gmail.com',
      password: hash
    }));
  }).catch((bcryptErr) => {
    throw bcryptErr;
  }));

  return Promise.all(data);
};
