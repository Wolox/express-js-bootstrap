const logger = require('../logger');
const { documentationTokenHeader } = require('../../config').common.headers;
const { documentationToken } = require('../../config').common.session;

exports.verifyDocumentationToken = (req, res, next) => {
  const receivedDocumentationToken = req.headers[documentationTokenHeader];

  if (!receivedDocumentationToken) {
    return next({ internalCode: 401, message: 'The documentation token was not given' });
  }

  if (receivedDocumentationToken !== documentationToken) {
    return next({ internalCode: 401, message: 'The given documentation token was incorrect' });
  }

  logger.info('Successful Authentication.');
  return next();
};
