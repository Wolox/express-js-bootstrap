const chai = require('chai'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  User = require('../app/models').user;

chai.should();

const successfulLogin = () => chai
  .request(server)
  .post('/users/sessions')
  .send({ username: 'username1', password: '1234' });

describe('auth middleware', () => {
  it('should fail because getting authorized endpoint without header', () => chai
    .request(server)
    .post('/logout')
    .then(response => {
      response.should.have.status(401);
      response.body.should.have.property('message');
      response.body.should.have.property('internal_code');
    }));

  it('should fail because user does not exist anymore',
    () => successfulLogin()
      .then(loginRes =>
        User.findOne({ where: { username: 'username1' } })
          .then(u =>
            u.destroy().then(() => chai
              .request(server)
              .post('/logout')
              .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
              .then(response => {
                response.should.have.status(401);
                response.body.should.have.property('message');
                response.body.should.have.property('internal_code');
              })))));

  it('should work successfully', () => successfulLogin().then(loginRes => chai
    .request(server)
    .post('/logout')
    .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
    .then(res => res.should.not.have.status(401))));
});
