const request = require('supertest'),
  dictum = require('dictum.js'),
  sessionManager = require('./../app/services/sessionManager'),
  User = require('../app/models').user,
  app = require('../app');

const successfulLogin = cb => {
  return request(app)
    .post('/users/sessions')
    .send({ username: 'username1', password: '1234' });
};

describe('auth middleware', () => {
  it('should fail because getting authorized endpoint without header', () => {
    return request(app)
      .post('/logout')
      .expect(401)
      .then(response => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('internal_code');
      });
  });

  it('should fail because user does not exist anymore', () => {
    return successfulLogin().then(loginRes => {
      return User.findOne({ where: { username: 'username1' } }).then(u => {
        return u.destroy().then(() => {
          return request(app)
            .post('/logout')
            .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
            .expect(401)
            .then(response => {
              expect(response.body).toHaveProperty('message');
              expect(response.body).toHaveProperty('internal_code');
            });
        });
      });
    });
  });

  it('should work successfully', () => {
    return successfulLogin().then(loginRes => {
      return request(app)
        .post('/logout')
        .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
        .expect(200);
    });
  });
});
