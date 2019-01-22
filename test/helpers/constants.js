exports.sequelizeFiles = [
  '.sequelizerc',
  'migrations/index.js',
  'migrations/migrations/.keep',
  'config/db.js',
  'app/models/index.js'
];

exports.sequelizeTemplateFiles = [
  'package.json',
  'README.md',
  'console.js',
  'app.js',
  'test/app.js',
  'config/db.js'
];

exports.jenkinsFiles = ['Jenkinsfile', '.woloxci/config.yml', '.woloxci/Dockerfile'];

exports.herokuFiles = ['Procfile'];

exports.dockerFiles = ['Dockerfile', 'Dockerrun.aws.json'];

exports.travisFiles = ['.travis.yml'];

exports.basicFiles = [
  'README.md',
  'pull_request_template.md',
  'package.json',
  'LICENSE.md',
  'console.js',
  'app.js',
  '.nvmrc',
  '.gitignore',
  '.eslintrc',
  '.eslintignore',
  'test/app.js',
  'docs/.keep',
  'config/development.js',
  'config/production.js',
  'config/testing.js',
  'config/index.js',
  'app/controllers/.keep',
  'app/services/.keep',
  'app/errors.js',
  'app/routes.js',
  'app/middlewares/errors.js',
  'app/logger/index.js'
];

exports.examplePrompts = {
  inTraining: false,
  projectName: 'Example',
  projectDescription: 'Example',
  urlRepository: 'https://test.com.ar',
  nodeVersion: '8.9.12',
  npmVersion: '6.4.1',
  sequelize: false,
  docker: false,
  deployStrategy: {},
  optionalsFeatures: {},
  ci: 'travis'
};

exports.exampleProjects = [
  [
    'Sequelize (Postgres), AWS, Docker, Jenkins and all optionals',
    {
      kickoffOptions: {
        sequelize: true,
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'postgres',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'jenkins'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.jenkinsFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'Sequelize (MySQL), AWS, Docker, Jenkins and non optionals',
    {
      kickoffOptions: {
        sequelize: true,
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'mysql',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'jenkins'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.jenkinsFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'Sequelize (mssql), AWS, Docker, Travis and all optionals',
    {
      kickoffOptions: {
        sequelize: true,
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'postgres',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'travis'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.travisFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'Sequelize (sqlite), AWS, Docker, Travis and non optionals',
    {
      kickoffOptions: {
        sequelize: true,
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'sqlite',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'travis'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.travisFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'AWS, Docker, Jenkins and all optionals',
    {
      kickoffOptions: {
        sequelize: false,
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'jenkins'
      },
      templateFiles: [exports.dockerFiles, exports.jenkinsFiles],
      files: [exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'AWS, Docker, Jenkins and non optionals',
    {
      kickoffOptions: {
        sequelize: false,
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'jenkins'
      },
      templateFiles: [exports.dockerFiles, exports.jenkinsFiles],
      files: [exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'AWS, Docker, Travis and all optionals',
    {
      kickoffOptions: {
        sequelize: false,
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'travis'
      },
      templateFiles: [exports.dockerFiles, exports.travisFiles],
      files: [exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'AWS, Docker, Travis and non optionals',
    {
      kickoffOptions: {
        sequelize: false,
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'travis'
      },
      templateFiles: [exports.dockerFiles, exports.travisFiles],
      files: [exports.dockerFiles, exports.travisFiles]
    }
  ]
];
