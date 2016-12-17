const bcrypt = require('bcrypt');

exports.execute = (db, cb) => {
  db.models.book.create(
    [
      { name: 'book 1' },
      { name: 'book 2' },
      { name: 'book 3' }
    ],
    (err) => {
      if (err) {
        throw err;
      }

      bcrypt.hash('1234', 10).then((hash) => {
        db.models.user.create(
          [
            {
              firstName: 'firstName1',
              lastName: 'lastName1',
              username: 'username1',
              email: 'email1@gmail.com',
              password: hash
            },
            {
              firstName: 'firstName2',
              lastName: 'lastName2',
              username: 'username2',
              email: 'email2@gmail.com',
              password: hash
            },
            {
              firstName: 'firstName3',
              lastName: 'lastName3',
              username: 'username3',
              email: 'email3@gmail.com',
              password: hash
            }
          ],
          (createErr) => {
            if (createErr) {
              throw createErr;
            }
            if (cb) {
              cb();
            }
          }
        );
      }).catch((bcryptErr) => {
        throw bcryptErr;
      });

    }
  );
};
