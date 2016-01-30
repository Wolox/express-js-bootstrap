var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    orm = require('./app/orm');


var init = function () {
    var app = express();

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    orm.init(app);

    routes.init(app);

    app.listen(8080);
};

init();
