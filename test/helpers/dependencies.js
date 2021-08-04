const commonDependencies = [
  'bcryptjs',
  'body-parser',
  'express',
  'jwt-simple',
  'umzug',
  'express-wolox-logger',
  'axios',
  'swagger-ui-express'
];

const commonDevDependencies = [
  'babel',
  'babel-core',
  'babel-eslint',
  'babel-preset-es2015',
  'dotenv',
  'eslint',
  'eslint-config-wolox',
  'eslint-config-wolox-node',
  'eslint-plugin-import',
  'eslint-plugin-prettier',
  'husky',
  'istanbul',
  'mocha',
  'mocha-lcov-reporter',
  'nodemon',
  'prettier',
  'prettier-eslint',
  'prompt'
];

const mochaChaiDev = ['chai', 'chai-http'];

const jestSuperTest = ['babel-jest', 'jest', 'supertest'];

const sequelize = ['sequelize', 'factory-girl'];

const sequelizeDev = [...jestSuperTest, 'sequelize-cli'];

const sequelizeMssql = [...sequelize, 'tedious'];

const sequelizeSqlLite = [...sequelize, 'sqlite3'];

const sequelizePostgres = [...sequelize, 'pg'];

const sequelizeMySql = [...sequelize, 'mysql2'];

exports.getDependenciesByName = projectName =>
  ({
    'mocha-chai': {
      dependencies: commonDependencies,
      devDependencies: [...commonDevDependencies, ...mochaChaiDev]
    },
    'jest-supertest': {
      dependencies: commonDependencies,
      devDependencies: [...commonDevDependencies, ...jestSuperTest]
    },
    mysql: {
      dependencies: sequelizeMySql,
      devDependencies: sequelizeDev
    },
    postgres: {
      dependencies: sequelizePostgres,
      devDependencies: sequelizeDev
    },
    mssql: {
      dependencies: sequelizeMssql,
      devDependencies: sequelizeDev
    },
    sqlite: {
      dependencies: sequelizeSqlLite,
      devDependencies: sequelizeDev
    }
  }[projectName]);

exports.semanticVersionRegex = new RegExp(/(\^*)\d+\.\d+\.\d+/);
