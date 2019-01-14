const chai = require('chai'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  User = require('../app/models').user,
  should = chai.should();

const successfulLogin = cb => {
  return chai
    .request(server)
    .post('/users/sessions')
    .send({ username: 'username1', password: '1234' });
};

describe('auth middleware', () => {
  it('should fail because getting authorized endpoint without header', () => {
    return chai
      .request(server)
      .post('/logout')
      .then(response => {
        response.should.have.status(401);
        response.body.should.have.property('message');
        response.body.should.have.property('internal_code');
      });
  });

  it('should fail because user does not exist anymore', () => {
    return successfulLogin().then(loginRes => {
      return User.findOne({ where: { username: 'username1' } }).then(u => {
        return u.destroy().then(() => {
          return chai
            .request(server)
            .post('/logout')
            .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
            .then(response => {
              response.should.have.status(401);
              response.body.should.have.property('message');
              response.body.should.have.property('internal_code');
            });
        });
      });
    });
  });

  it('should work successfully', () => {
    return successfulLogin().then(loginRes => {
      return chai
        .request(server)
        .post('/logout')
        .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
        .then(res => res.should.not.have.status(401));
    });
  });
});
