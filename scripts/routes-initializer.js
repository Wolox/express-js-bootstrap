const fs = require('fs');

exports.init = () => {
  const routes = './app/routes.js';
  const data =
    "// const controller = require('./controllers/controller');\n\n" +
    'exports.init = app => {\n' +
    "  // app.get('/endpoint/get/path', [], controller.methodGET);\n" +
    "  // app.put('/endpoint/put/path', [], controller.methodPUT);\n" +
    "  // app.post('/endpoint/post/path', [], controller.methodPOST);\n" +
    '};\n';

  fs.writeFile(routes, data, 'utf8', writeErr => {
    if (writeErr) return console.log(writeErr); // eslint-disable-line
  });
};
