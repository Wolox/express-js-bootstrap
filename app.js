var express = require('express'),
    routes = require('./app/routes');


var init = function (app) {
    
    routes.init(app);

    app.listen(8080);
};

var app = express();
init(app);
