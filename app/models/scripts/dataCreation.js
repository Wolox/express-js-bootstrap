exports.execute = function (db, cb) {
    db.models.book.create(
        [
            { name: 'book 1' },
            { name: 'book 2' },
            { name: 'book 3' }
        ],
        function (err) {
            if (err) {
                throw err;
            }

            db.models.user.create(
                [
                    {
                        firstName: 'firstName1',
                        lastName: 'lastName1',
                        username: 'username1',
                        email: 'email1@gmail.com',
                        password: '1234'
                    },
                    {
                        firstName: 'firstName2',
                        lastName: 'lastName2',
                        username: 'username2',
                        email: 'email2@gmail.com',
                        password: '1234'
                    },
                    {
                        firstName: 'firstName3',
                        lastName: 'lastName3',
                        username: 'username3',
                        email: 'email3@gmail.com',
                        password: '1234'
                    }
                ],
                function (createErr) {
                    if (createErr) {
                        throw createErr;
                    }
                    if (cb) {
                        cb();
                    }
                }
            );
        }
    );
};
