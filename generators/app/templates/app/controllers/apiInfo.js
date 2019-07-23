exports.apiInfo = (req, res, next) => {
  try {
    return res.status(200).send(req.body);
  } catch (err) {
    return next(err);
  }
};