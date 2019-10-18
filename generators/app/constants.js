const { filesGraphql } = require('./filesGraphql');
exports.NODE_DEFAULT_VERSION = '10.14.1';
exports.NPM_DEFAULT_VERSION = '6.4.1';
exports.ORM_OPTIONS = ['sequelize', 'mongoose'];
exports.SEQUELIZE_DEFAULT_VERSION = '5.10.1';
exports.SEQUELIZE_DEFAULT_DIALECT = 'postgres';
exports.SEQUELIZE_DIALECTS = ['mysql', 'sqlite', 'postgres', 'mssql'];
exports.MONGOOSE_DEFAULT_VERSION = '5.6.4';
exports.MONGOOSE_DEFAULT_DIALECT = 'mongoDB';
exports.MONGOOSE_DIALECTS = ['mongoDB'];
exports.DEPLOY_STRATEGIES = ['aws', 'heroku'];
exports.OPTIONALS_FEATURES = ['coveralls', 'rollbar', 'cors', 'helmet'];
exports.CI_OPTIONS = ['jenkins', 'travis'];
exports.TESTING_OPTIONS = ['mocha-chai', 'jest-supertest'];
exports.TECHNOLOGY_OPTIONS = ['expressJS', 'graphQL'];

exports.TRAINING_CONFIG = {
  projectName: 'WTraining',
  projectDescription: 'WTraining',
  nodeVersion: exports.NODE_DEFAULT_VERSION,
  npmVersion: exports.NPM_DEFAULT_VERSION,
  database: true,
  orm: { sequelize: true },
  sequelizeVersion: exports.SEQUELIZE_DEFAULT_VERSION,
  sequelizeDialect: exports.SEQUELIZE_DEFAULT_DIALECT,
  deployStrategy: { heroku: true },
  optionalsFeatures: {},
  ci: 'travis',
  testing: 'jest-supertest'
};
exports.TRAINING_GRAPHQL_CONFIG = {
  projectName: 'WTrainingGraphql',
  projectDescription: 'WTrainingGraphql',
  nodeVersion: exports.NODE_DEFAULT_VERSION,
  npmVersion: exports.NPM_DEFAULT_VERSION,
  database: true,
  orm: { sequelize: true },
  sequelizeVersion: exports.SEQUELIZE_DEFAULT_VERSION,
  sequelizeDialect: exports.SEQUELIZE_DEFAULT_DIALECT,
  deployStrategy: { heroku: true },
  optionalsFeatures: {},
  ci: 'travis',
  testing: 'jest-supertest'
};

// eslint-disable-next-line
exports.URL_REGEX = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)?(\/?|\#[-\d\w._]+?)$/;
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
    condition: answers => answers.orm && answers.orm.sequelize
  },
  {
    directory: 'migrations',
    name: 'index.js',
    condition: answers => answers.orm && answers.orm.sequelize
  },
  {
    directory: 'migrations/migrations',
    name: '.keep',
    condition: answers => answers.orm && answers.orm.sequelize
  },
  {
    directory: 'config',
    name: 'db.ejs',
    condition: answers => answers.orm && (answers.orm.sequelize || answers.orm.mongoose)
  },
  {
    directory: 'app/models',
    name: 'index.js',
    condition: answers => answers.orm && answers.orm.sequelize
  },
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
    name: 'app.ejs',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    name: 'server.ejs'
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
    name: '.nvmrc'
  },
  {
    name: 'gitignore',
    newName: '.gitignore',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    name: '.eslintrc.js'
  },
  {
    name: '.eslintignore'
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
    name: 'errors.js'
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
    directory: 'app/logger',
    name: 'index.js'
  },
  {
    directory: 'app/middlewares',
    name: 'apiInfo.js',
    condition: answers => answers.technology === 'expressJS'
  },
  {
    name: 'CHANGELOG.md'
  },
  ...filesGraphql
];
