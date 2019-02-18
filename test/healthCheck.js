const chai = require('chai'),
  server = require('./../app'),
  should = chai.should();

describe('healthCheck', () => {
  it('should responde with uptime', () => {
    return chai
      .request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.body.should.have.property('uptime');
      });
  });
});
