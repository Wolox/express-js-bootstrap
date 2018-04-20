// Must be executed from same folder README is located
const fs = require('fs'),
  prompt = require('prompt'),
  readme = require('./readme-initializer'),
  packagejson = require('./packagejson-initializer'),
  routes = require('./routes-initializer'),
  errors = require('./errors-initializer'),
  services = require('./services-initializer'),
  models = require('./models-initializer'),
  middlewares = require('./middlewares-initializer'),
  controllers = require('./controllers-initializer'),
  tests = require('./tests-initializer'),
  docs = require('./docs-initializer'),
  migrations = require('./migrations-initializer'),
  scripts = require('./scripts-initializer');

prompt.colors = false;
prompt.message = '';
prompt.delimiter = '';
prompt.start();

const config = {
  properties: {
    projectName: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Name must be only letters or dashes.',
      description: 'Projects name:',
      required: true
    },
    projectDescription: {
      description: 'Projects description:',
      required: false
    }
  }
};

const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const currentPath = `${path}/${file}`;
      if (fs.lstatSync(currentPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(currentPath);
      } else {
        // delete file
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(path);
  }
};

console.log('\nWelcome to the bootstrap script.'); // eslint-disable-line
console.log('\nPlease enter the following data.\n'); // eslint-disable-line

prompt.get(config, (err, result) => {
  const responsible = 'Wolox';
  if (err) {
    console.log(`\nError found. Operation ${err.message}.`); // eslint-disable-line
  } else {
    readme.init(responsible, responsible, result.projectName, result.projectDescription);
    packagejson.init(responsible, result.projectName, result.projectDescription);
    routes.init();
    errors.init();
    services.init();
    models.init();
    middlewares.init();
    controllers.init();
    tests.init();
    docs.init();
    migrations.init();
    deleteFolderRecursive('./scripts');
    scripts.init();
    console.log('Done!'); // eslint-disable-line
  }
});
