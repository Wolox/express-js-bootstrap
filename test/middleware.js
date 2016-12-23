const chai = require('chai'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  orm = require('./../app/orm').models,
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

describe('middleware', () => {
  it('should fail because getting authorized endpoint without header', (done) => {
    chai.request(server)
      .post('/logout')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should fail because user does not exist anymore', (done) => {
    successfulLogin((loginErr, loginRes) => {
      orm.models.user.one({ username: 'username1' }, (err, u) => {
        u.remove((removeErr) => {
          chai.request(server)
            .post('/logout')
            .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
            .end((logoutErr, res) => {
              res.should.have.status(401);
              done();
            });
        });
      });
    });
  });

  it('should work successfully', (done) => {
    successfulLogin((loginErr, loginRes) => {
      chai.request(server)
        .post('/logout')
        .set(sessionManager.HEADER_NAME, loginRes.body.access_token)
        .end((err, res) => {
          res.should.not.have.status(401);
          done();
        });
    });
  });
});
