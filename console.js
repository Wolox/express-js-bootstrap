const repl = require('repl'),
  fs = require('fs'),
  pjson = require('./package.json'),
  db = require('./app/models');

const convertFunctionToAsync = f => {
  return async (...args) => {
    const result = await f(...args);
    console.log(JSON.stringify(result, null, 2));
    return result;
  };
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
  Object.keys(db.models).forEach(model => {
    const asyncModelMethods = convertObjectFunctionsToAsync(db.models[model]);
    replServer.context[`${model}Model`] = asyncModelMethods;
  });
});
