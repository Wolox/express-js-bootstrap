var chai = require('chai'),
    server = require('./../app'),
    sessionManager = require('./../app/services/sessionManager'),
    orm = require('./../app/orm').models,
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

describe('middleware', function () {
    it('should fail because getting authorized endpoint without header', function (done) {
        chai.request(server)
            .post('/logout')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });

    it('should fail because user does not exist anymore', function (done) {
        successfulLogin(function (loginErr, loginRes) {
            orm.models.user.one({ username: 'username1', password: '1234' }, function (err, u) {
                u.remove(function (removeErr) {
                    chai.request(server)
                        .post('/logout')
                        .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
                        .end(function (logoutErr, res) {
                            res.should.have.status(401);
                            done();
                        });
                });
            });
        });
    });

    it('should work successfully', function (done) {
        successfulLogin(function (loginErr, loginRes) {
            chai.request(server)
                .post('/logout')
                .set(sessionManager.HEADER_NAME, loginRes.headers[sessionManager.HEADER_NAME])
                .end(function (err, res) {
                    res.should.not.have.status(401);
                    done();
                });
        });
    });
});
