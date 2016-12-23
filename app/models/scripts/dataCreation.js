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

      bcrypt.hash('1234', 10).then((password) => {
        bcrypt.genSalt(10).then((verificationCode) => {
          db.models.user.create(
            [
              {
                firstName: 'firstName1',
                lastName: 'lastName1',
                username: 'username1',
                email: 'email1@gmail.com',
                verificationCode,
                password
              }, {
                firstName: 'firstName2',
                lastName: 'lastName2',
                username: 'username2',
                email: 'email2@gmail.com',
                verificationCode,
                password
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
        });
      }).catch((bcryptErr) => {
        throw bcryptErr;
      });

    }
  );
};
