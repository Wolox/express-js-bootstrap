const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  should = chai.should();

describe('books', () => {
  describe('/books GET', () => {
    it('should return all books', done => {
      chai
        .request(server)
        .get('/books?limit=2')
        .then(res => {
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
          dictum.chai(res);
        })
        .then(() => done());
    });
  });

  describe('/books/:id GET', () => {
    it('should return book with id 1', done => {
      chai
        .request(server)
        .get('/books/1')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('id');
          res.body.should.have.property('name').should.not.be.null;
          res.body.should.have.property('author');
          res.body.should.have.property('publisher');
          res.body.should.have.property('price');
          res.body.should.have.property('link');
          res.body.should.have.property('year');
          dictum.chai(res);
        })
        .then(() => done());
    });

    it('should return error for book with id 5', done => {
      chai
        .request(server)
        .get('/books/5')
        .catch(err => {
          err.should.have.status(404);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        })
        .then(err => done());
    });
  });
});
