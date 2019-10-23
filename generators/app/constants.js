const { filesGraphql } = require('./filesGraphql'),
  { filesExpress } = require('./filesExpessjs'),
  { filesCommon } = require('./filesCommon');

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

exports.files = [...filesCommon, ...filesExpress, ...filesGraphql];
