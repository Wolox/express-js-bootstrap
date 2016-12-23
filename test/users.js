const chai = require('chai'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  should = chai.should();

const successfulLogin = (cb) => {
  chai.request(server)
    .post('/users/sessions')
    .send({ username: 'username1', password: '1234' })
    .end((err, res) => {
      if (cb) {
        cb(err, res);
      }
    });
};

describe('users', () => {
  describe('/users/sessions POST', () => {
    it('should fail login because of invalid username', (done) => {
      chai.request(server)
        .post('/users/sessions')
        .send({ username: 'invalid', password: '1234' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          done();
        });
    });

    it('should fail login because of invalid password', (done) => {
      chai.request(server)
        .post('/users/sessions')
        .send({ username: 'username1', password: 'invalid' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          done();
        });
    });

    it('should be successful', (done) => {
      successfulLogin((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('access_token');
        res.body.should.have.property('renew_id');
        done();
      });
    });
  })

  describe('/users/sessions/renew POST', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, (done) => {
      chai.request(server)
        .post('/users/sessions/renew')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should fail because renew_id is not being sent', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .post('/users/sessions/renew')
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            res.should.have.property('error');
            done();
          });
      });
    });

    it('should fail because expiration warning has not been received', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .post('/users/sessions/renew')
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .send({ renew_id: loginRes.body.renew_id })
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('/users/sessions/invalidate POST', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, (done) => {
      chai.request(server)
        .post('/users/sessions/invalidate')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should be successful', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .post('/users/sessions/invalidate')
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('/logout POST', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, (done) => {
      chai.request(server)
        .post('/logout')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should be successful', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .post('/logout')
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  })

  describe('/users/me GET', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, (done) => {
      chai.request(server)
        .get('/users/me')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should be successful', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .get('/users/me')
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            done();
          });
      });
    });
  })

  describe('/users POST', () => {
    it('should fail because email is missing', (done) => {
      chai.request(server)
        .post('/users')
        .send({ firstName: 'firstName', lastName: 'lastName', username: 'username', password: 'password' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          done();
        });
    });

    it('should fail because email is in use', (done) => {
      chai.request(server)
        .post('/users')
        .send({ firstName: 'firstName', lastName: 'lastName', username: 'username',
          password: 'password', email: 'email1@gmail.com' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          done();
        });
    });

    it('should be successful', (done) => {
      chai.request(server)
        .post('/users')
        .send({ firstName: 'firstName', lastName: 'lastName', username: 'username',
          password: 'password', email: 'email' })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  })

  describe('/users PUT', () => {
    it(`should fail because ${sessionManager.HEADER_NAME} header is not being sent`, (done) => {
      chai.request(server)
        .put('/users')
        .send({ firstName: 'firstName' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should fail because email is in use', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .put('/users')
          .send({ email: 'email2@gmail.com' })
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            done();
          });
      });
    });

    it('should be successful', (done) => {
      successfulLogin((loginErr, loginRes) => {
        chai.request(server)
          .put('/users')
          .send({ email: 'email@gmail.com' })
          .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.json;
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.headers.should.have.property(sessionManager.HEADER_NAME);
            done();
          });
      });
    });
  })
});
