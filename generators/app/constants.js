exports.NODE_DEFAULT_VERSION = '10.14.1';
exports.NPM_DEFAULT_VERSION = '6.4.1';
exports.SEQUELIZE_DEFAULT_VERSION = '4.34.0';
exports.SEQUELIZE_DEFAULT_DIALECT = 'postgres';
exports.SEQUELIZE_DIALECTS = ['mysql', 'sqlite', 'postgres', 'mssql'];
exports.DEPLOY_STRATEGIES = ['aws', 'heroku'];
exports.OPTIONALS_FEATURES = ['coveralls', 'rollbar', 'cors'];
exports.CI_OPTIONS = ['jenkins', 'travis'];
exports.TESTING_OPTIONS = ['mocha-chai', 'jest-supertest'];

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
  ci: 'travis',
  testing: 'jest-supertest'
};

// eslint-disable-next-line
exports.URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
exports.VERSION_REGEX = /[0-9]+.[0-9]+.[0-9]+/;
exports.APP_NAME_REGEX = /^[\w-]+$/;

exports.TUTORIALS = {
  GIT: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
  NPM: 'https://github.com/creationix/nvm#install-script'
};

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
    condition: answers => answers.docker && answers.deployStrategy.aws
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
    name: 'package.json'
  },
  {
    name: 'LICENSE.md'
  },
  {
    name: 'console.ejs'
  },
  {
    name: 'app.ejs'
  },
  {
    name: 'server.ejs'
  },
  {
    name: '.nvmrc'
  },
  {
    name: 'gitignore',
    newName: '.gitignore'
  },
  {
    name: '.eslintrc.js'
  },
  {
    name: '.eslintignore'
  },
  {
    directory: 'test',
    name: 'app.spec.ejs'
  },
  {
    directory: 'docs',
    name: '.keep'
  },
  {
    directory: 'config',
    name: 'development.ejs'
  },
  {
    directory: 'config',
    name: 'production.ejs'
  },
  {
    directory: 'config',
    name: 'testing.ejs'
  },
  {
    directory: 'config',
    name: 'index.ejs'
  },
  {
    directory: 'app/controllers',
    name: 'healthCheck.js'
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
