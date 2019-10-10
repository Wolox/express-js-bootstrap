exports.filesGraphql = [
  {
    directory: 'app/graphql/healthCheck',
    name: 'resolvers.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql/healthCheck',
    name: 'type_defs.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql/users',
    name: 'resolvers.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql/users',
    name: 'type_defs.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql/users',
    name: 'middlewares.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql',
    name: 'index.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql',
    name: 'schema_import.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/graphql',
    name: 'events.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/helpers',
    name: 'cache.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'app/models',
    name: 'user.js',
    condition: answers => answers.orm && answers.orm.sequelize && answers.technology === 'graphQL'
  },
  {
    directory: 'docs',
    name: '.keep',
    condition: answers => answers.orm && answers.orm.sequelize && answers.technology === 'graphQL'
  },
  {
    directory: 'migrations/migrations',
    name: '20190508143516-create-user.js',
    condition: answers => answers.orm && answers.orm.sequelize && answers.technology === 'graphQL'
  },
  {
    directory: 'test',
    name: 'server.spec.js',
    condition: answers =>
      answers.orm &&
      answers.orm.sequelize &&
      answers.testing === 'jest-supertest' &&
      answers.technology === 'graphQL'
  },
  {
    directory: 'test',
    name: 'app.spec.js',
    condition: answers =>
      answers.orm &&
      answers.orm.sequelize &&
      answers.testing === 'jest-supertest' &&
      answers.technology === 'graphQL'
  },
  {
    directory: 'test/__mocks__',
    name: '.keep',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'test/factories',
    name: 'user.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'test/users',
    name: 'mutations.spec.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'test/users',
    name: 'queries.spec.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    directory: 'test/users',
    name: 'resolvers.spec.js',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    name: '.gitignore',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    name: 'package-lock.json',
    condition: answers => answers.technology === 'graphQL'
  },
  {
    name: 'CHANGELOG.md',
    condition: answers => answers.technology === 'graphQL'
  }
];
