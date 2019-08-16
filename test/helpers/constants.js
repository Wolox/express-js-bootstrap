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
  'server.js',
  'test/app.spec.js',
  'config/db.js'
];

exports.mongooseTemplateFiles = [
  'package.json',
  'README.md',
  'console.js',
  'server.js',
  'test/app.spec.js',
  'config/db.js'
];

exports.testingFiles = ['package.json', 'test/app.spec.js'];

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
  'server.js',
  '.nvmrc',
  '.gitignore',
  '.eslintrc.js',
  '.eslintignore',
  'test/app.spec.js',
  'config/development.js',
  'config/production.js',
  'config/testing.js',
  'config/index.js',
  'app/controllers/healthCheck.js',
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
  orm: { sequelize: false },
  docker: false,
  deployStrategy: {},
  optionalsFeatures: {},
  ci: 'travis',
  testing: 'jest-supertest'
};

exports.jestAndSequelizeFiles = ['test/factory/factory_by_models.js'];

exports.exampleProjects = [
  [
    'Sequelize (Postgres), AWS, Docker, Jest, Jenkins and all optionals',
    {
      kickoffOptions: {
        orm: { sequelize: true },
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'postgres',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'jenkins',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.jenkinsFiles],
      files: [
        exports.sequelizeFiles,
        exports.dockerFiles,
        exports.jenkinsFiles,
        exports.jestAndSequelizeFiles
      ]
    }
  ],
  [
    'Sequelize (MySQL), AWS, Docker, Jest, Jenkins and non optionals',
    {
      kickoffOptions: {
        orm: { sequelize: true },
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'mysql',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'jenkins',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.jenkinsFiles],
      files: [
        exports.sequelizeFiles,
        exports.dockerFiles,
        exports.jenkinsFiles,
        exports.jestAndSequelizeFiles
      ]
    }
  ],
  [
    'Sequelize (mssql), AWS, Docker, Mocha, Travis and all optionals',
    {
      kickoffOptions: {
        orm: { sequelize: true },
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'postgres',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'travis',
        testing: 'mocha-chai'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.travisFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'Sequelize (sqlite), AWS, Docker, Mocha, Travis and non optionals',
    {
      kickoffOptions: {
        orm: { sequelize: true },
        sequelizeVersion: '1.1.2',
        sequelizeDialect: 'sqlite',
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'travis',
        testing: 'mocha-chai'
      },
      templateFiles: [exports.dockerFiles, exports.sequelizeTemplateFiles, exports.travisFiles],
      files: [exports.sequelizeFiles, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'AWS, Docker, Jest, Jenkins and all optionals',
    {
      kickoffOptions: {
        orm: { sequelize: false },
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'jenkins',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.jenkinsFiles],
      files: [exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'AWS, Docker, Jest, Jenkins and non optionals',
    {
      kickoffOptions: {
        orm: { sequelize: false },
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'jenkins',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.jenkinsFiles],
      files: [exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'AWS, Docker, Jest, Travis and all optionals',
    {
      kickoffOptions: {
        orm: { sequelize: false },
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {
          cors: true,
          rollbar: true,
          coveralls: true
        },
        ci: 'travis',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.travisFiles],
      files: [exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'AWS, Docker, Jest, Travis and non optionals',
    {
      kickoffOptions: {
        orm: { sequelize: false },
        docker: true,
        deployStrategy: { aws: true },
        optionalsFeatures: {},
        ci: 'travis',
        testing: 'jest-supertest'
      },
      templateFiles: [exports.dockerFiles, exports.travisFiles],
      files: [exports.dockerFiles, exports.travisFiles]
    }
  ]
];
