/* eslint-disable no-unused-expressions */

const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  /* eslint-disable no-unused-vars */
  should = chai.should();
  /* eslint-enable no-unused-vars */


describe('books', () => {
  describe('/books GET', () => {
    it('should return all books', () => chai
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
      }));
  });

  describe('/books/:id GET', () => {
    it('should return book with id 1', () => chai
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
      }));

    it('should return error for book with id 5', () => chai
      .request(server)
      .get('/books/5')
      .then(response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.have.property('message');
        response.body.should.have.property('internal_code');
      }));
  });
});
