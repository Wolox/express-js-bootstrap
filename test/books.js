var chai = require('chai'),
    server = require('./../app'),
    should = chai.should();

describe('books', function () {
    describe('/books GET', function () {
        it('should return all books', function (done) {
            chai.request(server)
                .get('/books')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.books.should.be.a('array');
                    res.body.books[0].should.have.property('id');
                    res.body.books[0].should.have.property('name').should.not.be.null;
                    res.body.books[0].should.have.property('author');
                    res.body.books[0].should.have.property('publisher');
                    res.body.books[0].should.have.property('price');
                    res.body.books[0].should.have.property('link');
                    res.body.books[0].should.have.property('year');
                    done();
                });
        });
    })

    describe('/books/:id GET', function () {
        it('should return book with id 1', function (done) {
            chai.request(server)
                .get('/books/1')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id');
                    res.body.should.have.property('name').should.not.be.null;
                    res.body.should.have.property('author');
                    res.body.should.have.property('publisher');
                    res.body.should.have.property('price');
                    res.body.should.have.property('link');
                    res.body.should.have.property('year');
                    done();
                });
        });

        it('should return error for book with id 5', function (done) {
            chai.request(server)
                .get('/books/5')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});
