// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { apiInfo } = require('./controllers/apiInfo');
const { apiInformation } = require('./middlewares/apiInfo');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api_info', [apiInformation], apiInfo);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
