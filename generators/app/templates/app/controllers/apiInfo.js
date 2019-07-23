exports.apiInfo = (req, res, next) => {
  try {
    return res.status(200).send(res.headers);
  } catch (err) {
    return next(err);
  }
};