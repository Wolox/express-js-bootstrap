exports.manage = function (req, res, next) {
    res.status(404)
    res.send({ status: 404, error: 'Unknow resource'});
};