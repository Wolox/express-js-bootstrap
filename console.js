const repl = require('repl'),
  fs = require('fs'),
  pjson = require('./package.json'),
  orm = require('./app/orm'),
  testFolder = './tests/';

orm.init().then(() => {
  const replServer = repl.start({
    prompt: `${pjson.name}> `
  });

  const servicesPath = './app/services/';
  fs.readdir(servicesPath, (err, files) => {
    files.forEach((file) => {
      replServer.context[`${file.split('.')[0]}Service`] = require(`${servicesPath}${file}`);
    });
  });
});
