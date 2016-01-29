
exports.getAll = function (req, res, next) {
	req.models.book.all(function(err, books) {

		if (err) {
			throw err;
		}

		res.status(200);
    	res.send({ books: books });
	});
};
