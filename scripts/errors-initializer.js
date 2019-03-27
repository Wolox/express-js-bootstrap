const fs = require('fs');

exports.init = () => {
  const routes = './app/errors.js';
  const data =
    'const internalError = (message, internalCode) => ({\n  message,\n  internalCode\n});\n\n' +
    "exports.DEFAULT_ERROR = 'default_error';\nexports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);\n";

  fs.writeFile(routes, data, 'utf8', writeErr => {
    if (writeErr) return console.log(writeErr); // eslint-disable-line
  });
};
