var jwt = require('jwt-simple');

exports.secure = function (req, res, next) {
	var authorization = req.cookies.Authorization;
	var token = jwt.decode(authorization, 'secret');
	console.log('Authorization: ' + authorization);
	console.log('Token: ' + token);
	next();
}