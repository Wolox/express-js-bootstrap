var chai = require('chai'),
    server = require('./../app'),
    sessionManager = require('./../app/services/sessionManager'),
    should = chai.should();

describe('users', function () {
    describe('/login GET', function () {
        it('should fail login because of invalid username', function (done) {
            chai.request(server)
                .get('/login?username=invalid&password=1234')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('should fail login because of invalid password', function (done) {
            chai.request(server)
                .get('/login?username=username1&password=invalid')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('should be successful', function (done) {
            chai.request(server)
                .get('/login?username=username1&password=1234')
                .end(function (err, res) {
                    res.should.have.status(200);
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
    })
});
