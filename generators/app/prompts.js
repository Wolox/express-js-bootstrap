const {
    checkboxReducer,
    flattenPrompts,
    validateUrl,
    validateVersionNumber,
    validateAppName
  } = require('./utils'),
  {
    NODE_DEFAULT_VERSION,
    NPM_DEFAULT_VERSION,
    ORM_OPTIONS,
    SEQUELIZE_DEFAULT_VERSION,
    SEQUELIZE_DEFAULT_DIALECT,
    SEQUELIZE_DIALECTS,
    MONGOOSE_DEFAULT_VERSION,
    MONGOOSE_DEFAULT_DIALECT,
    MONGOOSE_DIALECTS,
    DEPLOY_STRATEGIES,
    OPTIONALS_FEATURES,
    CI_OPTIONS,
    TESTING_OPTIONS
  } = require('./constants');

module.exports = flattenPrompts([
  {
    type: 'input',
    name: 'urlRepository',
    message: 'Enter git repository for this project',
    validate: validateUrl
  },
  {
    type: 'confirm',
    name: 'inTraining',
    message: 'Are you in WTraining ?',
    promptsNegative: [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter Project Name',
        validate: validateAppName
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Enter Project Description',
        default: ({ projectName }) => projectName,
        validate: value => value.trim().length !== 0 || 'Please enter a valid description'
      },
      {
        type: 'input',
        name: 'nodeVersion',
        message: 'Enter NodeJS Version',
        default: NODE_DEFAULT_VERSION,
        validate: validateVersionNumber
      },
      {
        type: 'input',
        name: 'npmVersion',
        message: 'Enter NPM Version',
        default: NPM_DEFAULT_VERSION,
        validate: validateVersionNumber
      },
      {
        type: 'checkbox',
        name: 'orm',
        message: 'Select the ORM for your project',
        filter: checkboxReducer,
        choices: ORM_OPTIONS,
        chosen: [
          {
            condition: 'sequelize',
            prompts: [
              {
                type: 'input',
                name: 'sequelizeVersion',
                message: 'Enter Sequelize Version',
                default: SEQUELIZE_DEFAULT_VERSION,
                validate: validateVersionNumber
              },
              {
                type: 'list',
                name: 'sequelizeDialect',
                message: 'Enter Database Dialect',
                default: SEQUELIZE_DEFAULT_DIALECT,
                choices: SEQUELIZE_DIALECTS
              }
            ]
          },
          {
            condition: 'mongoose',
            prompts: [
              {
                type: 'input',
                name: 'mongooseVersion',
                message: 'Enter Mongoose Version',
                default: MONGOOSE_DEFAULT_VERSION,
                validate: validateVersionNumber
              },
              {
                type: 'list',
                name: 'mongooseDialect',
                message: 'Enter Database Dialect',
                default: MONGOOSE_DEFAULT_DIALECT,
                choices: MONGOOSE_DIALECTS
              }
            ]
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'deployStrategy',
        message: 'Select Deploy strategy for your project',
        filter: checkboxReducer,
        choices: DEPLOY_STRATEGIES
      },
      {
        type: 'confirm',
        name: 'docker',
        message: 'Are you going to use docker for the deploy?'
      },
      {
        type: 'checkbox',
        name: 'optionalsFeatures',
        message: 'Choose optionals features for your project',
        filter: checkboxReducer,
        choices: OPTIONALS_FEATURES
      },
      {
        type: 'list',
        name: 'ci',
        message: 'Choose CI for your project',
        choices: CI_OPTIONS
      },
      {
        type: 'list',
        name: 'testing',
        message: 'Choose your testing option',
        choices: TESTING_OPTIONS
      }
    ]
  }
]);
