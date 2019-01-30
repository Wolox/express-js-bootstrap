const request = require('supertest'),
  dictum = require('dictum.js'),
  app = require('../app');

describe('books', () => {
  describe('/books GET', () => {
    it('should return all books', () => {
      return request(app)
        .get('/books?limit=2')
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.body.books)).toBe(true);
          expect(res.body.books[0]).toHaveProperty('id');
          expect(res.body.books[0]).toHaveProperty('name');
          expect(res.body.books[0].name).not.toBeNull();
          expect(res.body.books[0]).toHaveProperty('author');
          expect(res.body.books[0]).toHaveProperty('publisher');
          expect(res.body.books[0]).toHaveProperty('price');
          expect(res.body.books[0]).toHaveProperty('link');
          expect(res.body.books[0]).toHaveProperty('year');
          dictum.chai(res);
        });
    });
  });

  describe('/books/:id GET', () => {
    it('should return book with id 1', () => {
      return request(app)
        .get('/books/1')
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body.name).not.toBeNull();
          expect(res.body).toHaveProperty('author');
          expect(res.body).toHaveProperty('publisher');
          expect(res.body).toHaveProperty('price');
          expect(res.body).toHaveProperty('link');
          expect(res.body).toHaveProperty('year');
          dictum.chai(res);
        });
    });

    it('should return error for book with id 5', () => {
      return request(app)
        .get('/books/5')
        .expect(404)
        .then(response => {
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('internal_code');
        });
    });
  });
});
