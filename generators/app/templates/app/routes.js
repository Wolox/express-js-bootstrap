// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { apiInfo, dependenciesInfo } = require('./controllers/apiInfo');
const { apiInformation } = require('./middlewares/apiInfo');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/apiInfo', [apiInformation], apiInfo);
  app.get('/dependencies', [], dependenciesInfo);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
