const chai = require('chai'),
  server = require('./../app'),
  /* eslint-disable no-unused-vars */
  should = chai.should();
  /* eslint-enable no-unused-vars */

describe('healthCheck', () => {
  it('should respond with uptime', () => chai
    .request(server)
    .get('/health')
    .then(response => {
      response.should.have.status(200);
      response.body.should.have.property('uptime');
    }));
});
