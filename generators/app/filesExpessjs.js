exports.filesExpress = [
  {
    directory: 'test/factory',
    name: 'factory_by_models.ejs',
    condition: answers =>
      answers.orm &&
      answers.orm.sequelize &&
      answers.testing === 'jest-supertest' &&
      answers.technology === 'expressJS'
  },
  {
    directory: 'test',
    name: 'setup.js',
    condition: answers =>
      answers.orm &&
      answers.orm.sequelize &&
      answers.testing === 'jest-supertest' &&
      answers.technology === 'expressJS'
  },
  {
    directory: 'test',
    name: 'app.spec.ejs',
    condition: answers => answers.testing === 'mocha-chai' && answers.technology === 'expressJS'
  },
  {
    name: 'app.ejs',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'documentation',
    name: 'index.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'documentation/schemas',
    name: 'index.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'documentation/schemas',
    name: 'user.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'documentation/paths',
    name: 'index.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'documentation/paths',
    name: 'user.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'app/controllers',
    name: 'healthCheck.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'app/services',
    name: '.keep',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'app',
    name: 'routes.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'app/middlewares',
    name: 'errors.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    directory: 'app/middlewares',
    name: 'apiInfo.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    name: 'package.json'
  },
  {
    name: 'server.ejs'
  }
];
