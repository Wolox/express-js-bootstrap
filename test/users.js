const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  should = chai.should();

const successfulLogin = cb => {
  return chai
    .request(server)
    .post('/users/sessions')
    .send({ username: 'username1', password: '1234' });
};

describe('users', () => {
  describe('/users/sessions POST', () => {
    it('should fail login because of invalid username', done => {
      chai
        .request(server)
        .post('/users/sessions')
        .send({ username: 'invalid', password: '1234' })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        })
        .then(() => done());
    });

    it('should fail login because of invalid password', done => {
      chai
        .request(server)
        .post('/users/sessions')
        .send({ username: 'username1', password: 'invalid' })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        })
        .then(() => done());
    });

    it('should be successful', done => {
      successfulLogin()
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          res.headers.should.have.property(sessionManager.HEADER_NAME);
          dictum.chai(res);
        })
        .then(() => done());
    });
  });

  describe('/logout POST', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, done => {
      chai
        .request(server)
        .post('/logout')
        .catch(err => err.should.have.status(401))
        .then(() => done());
    });

    it('should be successful', done => {
      successfulLogin()
        .then(loginRes => {
          return chai
            .request(server)
            .post('/logout')
            .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
            .then(res => res.should.have.status(200));
        })
        .then(() => done());
    });
  });

  describe('/users/me GET', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, done => {
      chai
        .request(server)
        .get('/users/me')
        .catch(err => err.should.have.status(401))
        .then(() => done());
    });

    it('should be successful', done => {
      successfulLogin()
        .then(loginRes => {
          return chai
            .request(server)
            .get('/users/me')
            .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
            .then(res => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('username');
              res.body.should.have.property('email');
              res.body.should.have.property('password');
              dictum.chai(res);
            });
        })
        .then(() => done());
    });
  });

  describe('/users POST', () => {
    it('should fail because email is missing', done => {
      chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        })
        .then(() => done());
    });

    it('should fail because email is in use', done => {
      chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password',
          email: 'email1@gmail.com'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        })
        .then(() => done());
    });

    it('should be successful', done => {
      chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'firstName',
          lastName: 'lastName',
          username: 'username',
          password: 'password',
          email: 'email'
        })
        .then(res => {
          res.should.have.status(200);
          dictum.chai(res);
        })
        .then(() => done());
    });
  });

  describe('/users PUT', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, done => {
      chai
        .request(server)
        .put('/users')
        .send({ firstName: 'firstName' })
        .catch(err => err.should.have.status(401))
        .then(() => done());
    });

    it('should fail because email is in use', done => {
      successfulLogin()
        .then(res => {
          return chai
            .request(server)
            .put('/users')
            .send({ email: 'email2@gmail.com' })
            .set(sessionManager.HEADER_NAME, res.headers[sessionManager.HEADER_NAME])
            .catch(err => {
              err.should.have.status(400);
              err.response.should.be.json;
              err.response.body.should.have.property('message');
              err.response.body.should.have.property('internal_code');
            });
        })
        .then(() => done());
    });

    it('should be successful', done => {
      successfulLogin()
        .then(loginRes => {
          return chai
            .request(server)
            .put('/users')
            .send({ email: 'email@gmail.com' })
            .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
            .then(res => {
              res.should.have.status(200);
              res.should.be.json;
              res.should.be.json;
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('username');
              res.body.should.have.property('email');
              res.body.should.have.property('password');
              res.headers.should.have.property(sessionManager.HEADER_NAME);
              dictum.chai(res);
            });
        })
        .then(() => done());
    });
  });
});
