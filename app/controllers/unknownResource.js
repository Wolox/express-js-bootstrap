exports.manage = (_, res) => {
  res.status(404);
  res.send({ status: 404, error: 'Unknow resource' });
};
