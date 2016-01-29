var express = require('express'),
    routes = require('./app/routes'),
    orm = require('./app/orm');


var init = function () {
	var app = express();

    orm.init(app);

    routes.init(app);

    app.listen(8080);
};

init();
