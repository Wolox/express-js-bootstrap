const fs = require('fs');

exports.init = () => {

  const routes = './app/errors.js';
  const data = '\nexports.notFound = {\n  statusCode: 404,\n  message: \'Not found\'\n};\n\n'
    + 'exports.defaultError = (message) => {\n  return {\n    statusCode: 500,\n    message\n  };\n};\n';

  fs.writeFile(routes, data, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err); // eslint-disable-line
  });
};
