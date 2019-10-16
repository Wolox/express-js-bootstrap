const repl = require('repl'),
  fs = require('fs');

const pjson = require('./package.json');

const convertFunctionToAsync = f => async (...args) => {
  const result = await f(...args);
  console.log(JSON.stringify(result, null, 2)); // eslint-disable-line no-console
  return result;
};

const convertObjectFunctionsToAsync = serviceMethods => {
  const asyncServiceMethods = {};
  Object.keys(serviceMethods).forEach(key => {
    if (typeof serviceMethods[key] === 'function') {
      asyncServiceMethods[key] = convertFunctionToAsync(serviceMethods[key]);
    } else {
      asyncServiceMethods[key] = serviceMethods[key];
    }
  });
  return asyncServiceMethods;
};

Promise.resolve().then(() => {
  const replServer = repl.start({
    prompt: `${pjson.name}> `
  });
  const servicesPath = './app/services/';
  fs.readdir(servicesPath, (err, files) => {
    files.forEach(file => {
      const serviceMethods = require(`${servicesPath}${file}`);
      const asyncServiceMethods = convertObjectFunctionsToAsync(serviceMethods);
      replServer.context[`${file.split('.')[0]}Service`] = asyncServiceMethods;
    });
  });
});
