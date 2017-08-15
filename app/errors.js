exports.invalidUser = {
  statusCode: 400,
  message: 'Invalid username or password'
};

exports.bookNotFound = {
  statusCode: 404,
  message: 'Book not found'
};

exports.savingError = message => {
  return {
    statusCode: 400,
    message
  };
};

exports.databaseError = message => {
  return {
    statusCode: 503,
    message
  };
};

exports.defaultError = message => {
  return {
    statusCode: 500,
    message
  };
};
