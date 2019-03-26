const fs = require('fs');

exports.init = () => {
  const routes = './app/routes.js';
  const data =
    "const { healthCheck } = require('./controllers/healthCheck');\n\n" +
    'exports.init = app => {\n' +
    '  // health\n' +
    "  app.get('/', [], healthCheck);\n" +
    "  // app.get('/endpoint/get/path', [], controller.methodGET);\n" +
    "  // app.put('/endpoint/put/path', [], controller.methodPUT);\n" +
    "  // app.post('/endpoint/post/path', [], controller.methodPOST);\n" +
    '};\n';

  fs.writeFile(routes, data, 'utf8', writeErr => {
    if (writeErr) console.log(writeErr); // eslint-disable-line
  });
};
