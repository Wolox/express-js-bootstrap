exports.sequelizeFilesGraphql = [
  '.sequelizerc',
  'migrations/index.js',
  'migrations/migrations/20190508143516-create-user.js',
  'config/db.js',
  'app/models/index.js',
  'app/models/user.js'
];
exports.sequelizeTemplateFiles = ['package.json', 'README.md', 'console.js', 'server.js', 'config/db.js'];
exports.dockerFiles = ['Dockerfile', 'Dockerrun.aws.json'];
exports.jenkinsFiles = ['Jenkinsfile', '.woloxci/config.yml', '.woloxci/Dockerfile'];
exports.travisFiles = ['.travis.yml'];

exports.exampleProjectsGraphql = [
  [
    'Sequelize (Postgres), AWS, Docker, Jest, Jenkins and all optionals',
    {
      kickoffOptions: {
        database: true,
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
      files: [exports.sequelizeFilesGraphql, exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'Sequelize (MySQL), AWS, Docker, Jest, Jenkins and non optionals',
    {
      kickoffOptions: {
        database: true,
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
      files: [exports.sequelizeFilesGraphql, exports.dockerFiles, exports.jenkinsFiles]
    }
  ],
  [
    'Sequelize (mssql), AWS, Docker, Mocha, Travis and all optionals',
    {
      kickoffOptions: {
        database: true,
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
      files: [exports.sequelizeFilesGraphql, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'Sequelize (sqlite), AWS, Docker, Mocha, Travis and non optionals',
    {
      kickoffOptions: {
        database: true,
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
      files: [exports.sequelizeFilesGraphql, exports.dockerFiles, exports.travisFiles]
    }
  ],
  [
    'AWS, Docker, Jest, Jenkins and all optionals',
    {
      kickoffOptions: {
        database: true,
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
        database: true,
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
        database: true,
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
        database: true,
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
