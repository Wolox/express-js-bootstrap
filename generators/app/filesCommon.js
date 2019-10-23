exports.filesCommon = [
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
    name: 'README.md'
  },
  {
    name: 'pull_request_template.md'
  },
  {
    name: 'LICENSE.md'
  },
  {
    name: 'console.ejs'
  },
  {
    name: '.nvmrc'
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
    directory: 'app',
    name: 'errors.js'
  },
  {
    directory: 'app/logger',
    name: 'index.js'
  },
  {
    name: 'CHANGELOG.md'
  },
  {
    name: '.gitignore'
  },
  {
    directory: 'test',
    name: 'setup.js',
    condition: answers => answers.orm && answers.orm.sequelize && answers.testing === 'jest-supertest'
  }
];
