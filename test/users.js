const request = require('supertest'),
  sessionManager = require('./../app/services/sessionManager'),
  dictum = require('dictum.js'),
  app = require('../app');

const successfulLogin = cb => {
  return request(app)
    .post('/users/sessions')
    .send({ username: 'username1', password: '1234' });
};

describe('users', () => {
  describe('/users/sessions POST', () => {
    it('should fail login because of invalid username', () => {
      return request(app)
        .post('/users/sessions')
        .send({ username: 'invalid', password: '1234' })
        .expect(400)
        .then(err => {
          expect(err.body).toHaveProperty('message');
          expect(err.body).toHaveProperty('internal_code');
        });
    });

    it('should fail login because of invalid password', () => {
      return request(app)
        .post('/users/sessions')
        .send({ username: 'username1', password: 'invalid' })
        .expect(400)
        .then(err => {
          expect(err.body).toHaveProperty('message');
          expect(err.body).toHaveProperty('internal_code');
        });
    });

    it('should be successful', () => {
      return successfulLogin()
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('firstName');
          expect(res.body).toHaveProperty('lastName');
          expect(res.body).toHaveProperty('username');
          expect(res.body).toHaveProperty('email');
          expect(res.body).toHaveProperty('password');
          expect(res.headers).toHaveProperty(sessionManager.HEADER_NAME);
          dictum.chai(res);
        });
    });
  });

  describe('/logout POST', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, () => {
      return request(app)
        .post('/logout')
        .expect(401);
    });

    it('should be successful', () => {
      return successfulLogin().then(loginRes => {
        return request(app)
          .post('/logout')
          .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
          .expect(200);
      });
    });
  });

  describe('/users/me GET', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, () => {
      return request(app)
        .get('/users/me')
        .expect(401);
    });

    it('should be successful', () => {
      return successfulLogin().then(loginRes => {
        return request(app)
          .get('/users/me')
          .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
          .expect(200)
          .then(res => {
            expect(res.body).toHaveProperty('firstName');
            expect(res.body).toHaveProperty('lastName');
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('email');
            expect(res.body).toHaveProperty('password');
            dictum.chai(res);
          });
      });
    });
  });

  describe('/users POST', () => {
    it('should fail because email is missing', () => {
      return request(app)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password'
        })
        .expect(400)
        .then(err => {
          expect(err.body).toHaveProperty('message');
          expect(err.body).toHaveProperty('internal_code');
        });
    });

    it('should fail because email is in use', () => {
      return request(app)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password',
          email: 'email1@gmail.com'
        })
        .expect(400)
        .then(err => {
          expect(err.body).toHaveProperty('message');
          expect(err.body).toHaveProperty('internal_code');
        });
    });

    it('should be successful', () => {
      return request(app)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password',
          email: 'email'
        })
        .expect(200)
        .then(dictum.chai);
    });
  });

  describe('/users PUT', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, () => {
      return request(app)
        .put('/users')
        .send({ firstName: 'firstName' })
        .expect(401);
    });

    it('should fail because email is in use', () => {
      return successfulLogin().then(res => {
        return request(app)
          .put('/users')
          .send({ email: 'email2@gmail.com' })
          .set(sessionManager.HEADER_NAME, res.headers[sessionManager.HEADER_NAME])
          .expect(400)
          .then(err => {
            expect(err.body).toHaveProperty('message');
            expect(err.body).toHaveProperty('internal_code');
          });
      });
    });

    it('should be successful', () => {
      return successfulLogin().then(loginRes => {
        return request(app)
          .put('/users')
          .send({ email: 'email@gmail.com' })
          .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
          .expect(200)
          .then(res => {
            expect(res.body).toHaveProperty('firstName');
            expect(res.body).toHaveProperty('lastName');
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('email');
            expect(res.body).toHaveProperty('password');
            expect(res.headers).toHaveProperty(sessionManager.HEADER_NAME);
            dictum.chai(res);
          });
      });
    });
  });
});
