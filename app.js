var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/config').config,
    routes = require('./app/routes'),
    orm = require('./app/orm');

var init = function () {
    var app = express();
    module.exports = app;

    // Client must send "Content-Type: application/json" header
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    orm.init(app);

    routes.init(app);

    app.listen(config.common.port || 8080);
};

init();
