exports.NODE_DEFAULT_VERSION = '10.14.1';
exports.NPM_DEFAULT_VERSION = '6.4.1';
exports.SEQUELIZE_DEFAULT_VERSION = '4.34.0';
exports.SEQUELIZE_DEFAULT_DIALECT = 'postgres';
exports.SEQUELIZE_DIALECTS = ['mysql', 'sqlite', 'postgres', 'mssql'];
exports.DEPLOY_STRATEGIES = ['aws', 'heroku'];
exports.OPTIONALS_FEATURES = ['coveralls', 'rollbar', 'cors'];
exports.CI_OPTIONS = ['jenkins', 'travis'];

exports.TRAINING_CONFIG = {
  projectName: 'WTraining',
  projectDescription: 'WTraining',
  nodeVersion: exports.NODE_DEFAULT_VERSION,
  npmVersion: exports.NPM_DEFAULT_VERSION,
  sequelize: true,
  sequelizeVersion: exports.SEQUELIZE_DEFAULT_VERSION,
  sequelizeDialect: exports.SEQUELIZE_DEFAULT_DIALECT,
  deployStrategy: { heroku: true },
  optionalsFeatures: {},
  ci: 'travis'
};

exports.URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
exports.VERSION_REGEX = /[0-9]+.[0-9]+.[0-9]+/;
exports.APP_NAME_REGEX = /^[\w-]+$/;

exports.files = [
  {
    name: 'Jenkinsfile',
    condition: answers => answers.ci === 'jenkins'
  },
  {
    directory: '.woloxci',
    name: 'config.yml',
    condition: answers => answers.ci === 'jenkins'
  },
  {
    directory: '.woloxci',
    name: 'Dockerfile',
    condition: answers => answers.ci === 'jenkins'
  },
  {
    name: 'Procfile',
    condition: answers => answers.deployStrategy.heroku
  },
  {
    name: 'Dockerfile',
    condition: answers => answers.docker
  },
  {
    name: 'Dockerrun.aws.json',
    condition: answers => answers.docker
  },
  {
    name: '.travis.yml',
    condition: answers => answers.ci === 'travis'
  },
  {
    name: '.sequelizerc',
    condition: answers => answers.sequelize
  },
  {
    directory: 'migrations',
    name: 'index.js',
    condition: answers => answers.sequelize
  },
  {
    directory: 'migrations/migrations',
    name: '.keep',
    condition: answers => answers.sequelize
  },
  {
    directory: 'config',
    name: 'db.ejs',
    newName: 'db.js',
    condition: answers => answers.sequelize
  },
  {
    directory: 'app/models',
    name: 'index.js',
    condition: answers => answers.sequelize
  },
  {
    name: 'README.md'
  },
  {
    name: 'pull_request_template.md'
  },
  {
    name: 'package.ejs',
    newName: 'package.json'
  },
  {
    name: 'LICENSE.md'
  },
  {
    name: 'console.ejs',
    newName: 'console.js'
  },
  {
    name: 'app.ejs',
    newName: 'app.js'
  },
  {
    name: '.nvmrc'
  },
  {
    name: '.gitignore'
  },
  {
    name: '.eslintrc'
  },
  {
    name: '.eslintignore'
  },
  {
    directory: 'test',
    name: 'app.ejs',
    newName: 'app.js'
  },
  {
    directory: 'docs',
    name: '.keep'
  },
  {
    directory: 'config',
    name: 'development.js'
  },
  {
    directory: 'config',
    name: 'production.js'
  },
  {
    directory: 'config',
    name: 'staging.js'
  },
  {
    directory: 'config',
    name: 'testing.js'
  },
  {
    directory: 'config',
    name: 'index.ejs',
    newName: 'index.js'
  },
  {
    directory: 'app/controllers',
    name: '.keep'
  },
  {
    directory: 'app/services',
    name: '.keep'
  },
  {
    directory: 'app',
    name: 'errors.js'
  },
  {
    directory: 'app',
    name: 'routes.js'
  },
  {
    directory: 'app/middlewares',
    name: 'errors.js'
  },
  {
    directory: 'app/logger',
    name: 'index.js'
  }
];
