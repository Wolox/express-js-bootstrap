var chai = require('chai'),
    server = require('./../app'),
    sessionManager = require('./../app/services/sessionManager'),
    should = chai.should();

function successfulLogin (cb) {
    chai.request(server)
        .get('/login?username=username1&password=1234')
        .end(function (err, res) {
            if (cb) {
                cb(err, res);
            }
        });
}

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
            successfulLogin(function (err, res) {
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

    describe('/logout POST', function () {
        it('should fail because ' + sessionManager.HEADER_NAME + ' header is not being sent', function (done) {
            chai.request(server)
                .post('/logout')
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        it('should be successfull', function (done) {
            successfulLogin(function (loginErr, loginRes) {
                chai.request(server)
                    .post('/logout')
                    .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    })

    describe('/users/me GET', function () {
        it('should fail because ' + sessionManager.HEADER_NAME + ' header is not being sent', function (done) {
            chai.request(server)
                .get('/users/me')
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        it('should be successfull', function (done) {
            successfulLogin(function (loginErr, loginRes) {
                chai.request(server)
                    .get('/users/me')
                    .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
                    .end(function (err, res) {
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

    describe('/users POST', function () {
        it('should fail because email is missing', function (done) {
            chai.request(server)
                .post('/users')
                .send({ firstName: 'firstName', lastName: 'lastName', username: 'username', password: 'password' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('should fail because email is in use', function (done) {
            chai.request(server)
                .post('/users')
                .send({ firstName: 'firstName', lastName: 'lastName', username: 'username',
                    password: 'password', email: 'email1@gmail.com' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('should be successfull', function (done) {
            chai.request(server)
                .post('/users')
                .send({ firstName: 'firstName', lastName: 'lastName', username: 'username',
                    password: 'password', email: 'email' })
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    })
});
