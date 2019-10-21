const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    sequelizeFiles,
    basicFilesGraphql,
    sequelizeTemplateFiles,
    jenkinsFiles,
    examplePrompts
  } = require('./helpers/constants');

const sequelizeKickoff = (dialect, technology, options) =>
  utils.runKickoff({
    ...examplePrompts,
    projectName: 'SequelizeProject',
    technology,
    projectDescription: 'SequelizeProject',
    orm: { sequelize: true },
    sequelizeVersion: '1.1.2',
    sequelizeDialect: dialect,
    ...options
  });

beforeAll(() => mockCommand());

const availableDialects = [
  ['mysql', 'expressJS'],
  ['postgres', 'expressJS'],
  ['mssql', 'expressJS'],
  ['sqlite', 'expressJS'],

  ['mysql', 'graphQL'],
  ['postgres', 'graphQL'],
  ['mssql', 'graphQL'],
  ['sqlite', 'graphQL']
];

describe.each(availableDialects)('Sequelize project (%s)', (dialect, technology) => {
  beforeAll(() => sequelizeKickoff(dialect, technology));

  test(`creates sequelize files for ${dialect}`, () => {
    if (technology === 'graphQL') {
      return utils.checkExistentFiles([basicFilesGraphql, sequelizeFiles], 'SequelizeProject');
    }
    return utils.checkExistentFiles([basicFiles, sequelizeFiles], 'SequelizeProject');
  });

  test.each(sequelizeTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});

describe.each(availableDialects)('Sequelize project (%s) along with Jenkins', (dialect, technology) => {
  beforeAll(() => sequelizeKickoff(dialect, technology, { ci: 'jenkins' }));

  test(`creates sequelize files for ${dialect}`, () => {
    if (technology === 'graphQL') {
      return utils.checkExistentFiles([basicFilesGraphql, sequelizeFiles, jenkinsFiles], 'SequelizeProject');
    }
    return utils.checkExistentFiles([basicFiles, sequelizeFiles, jenkinsFiles], 'SequelizeProject');
  });

  test.each([...sequelizeTemplateFiles, '.woloxci/config.yml'])('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});
