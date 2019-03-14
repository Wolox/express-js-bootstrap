const chai = require('chai'),
  server = require('./../app'),
  should = chai.should();

describe('healthCheck', () => {
  it('should respond with uptime', () => {
    return chai
      .request(server)
      .get('/health')
      .then(response => {
        response.should.have.status(200);
        response.body.should.have.property('uptime');
      });
  });
});
