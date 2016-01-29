var orm = require('orm');

var init = function () {
    orm.connect('postgres://michelagopian:@127.0.0.1:5432/books', function (err, db) {
      if (err) throw err;

        console.log('Connected to db!');

        var Book = db.define("book", {
            name      : String,
            author    : String,
            year      : Number // FLOAT
        });

        // add the table to the database
        db.sync(function(err) { 
            if (err) throw err;

            console.log('Sync db!');

            var person = {
                name:      'Libro de mishu',
                author:    'mishuagopian',
                'year':    2012
            };
            // add a row to the person table
            Book.create(person, function(err) {
                if (err) throw err;

                console.log('Person created!');

                // query the person table by surname
                Book.find({ name: "Libro de mishu" }, function (err, books) {
                    if (err) throw err;

                    console.log("People found: %d", books.length);
                    console.log("First person: %s, year %d", books[0].name, books[0].year);
                });
            });
        });
    });
};

init();