var chai = require('chai'),
    server = require('./../app'),
    should = chai.should();

describe('books', function () {
    it('should list ALL books on /books GET', function (done) {
        chai.request(server)
            .get('/books')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.books.should.be.a('array');
                res.body.books[0].should.have.property('id');
                res.body.books[0].should.have.property('name');
                res.body.books[0].should.have.property('author');
                res.body.books[0].should.have.property('publisher');
                res.body.books[0].should.have.property('price');
                res.body.books[0].should.have.property('link');
                res.body.books[0].should.have.property('year');
                done();
            });
    });
});
