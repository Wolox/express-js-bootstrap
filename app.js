var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./app/routes'),
    orm = require('./app/orm');


var init = function () {
    var app = express();

    // Client must send "Content-Type: application/json" header
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

    orm.init(app);

    routes.init(app);

    app.listen(8080);
};

init();
