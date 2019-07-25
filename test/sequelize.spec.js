const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    sequelizeFiles,
    sequelizeTemplateFiles,
    jenkinsFiles,
    examplePrompts
  } = require('./helpers/constants');

const sequelizeKickoff = (dialect, options) =>
  utils.runKickoff({
    ...examplePrompts,
    projectName: 'SequelizeProject',
    projectDescription: 'SequelizeProject',
    orm: { sequelize: true },
    sequelizeVersion: '1.1.2',
    sequelizeDialect: dialect,
    ...options
  });

beforeAll(() => mockCommand());

const availableDialects = ['mysql', 'postgres', 'mssql', 'sqlite'];

describe.each(availableDialects)('Sequelize project (%s)', dialect => {
  beforeAll(() => sequelizeKickoff(dialect));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles], 'SequelizeProject');
  });

  test.each(sequelizeTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});

describe.each(availableDialects)('Sequelize project (%s) along with Jenkins', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, { ci: 'jenkins' }));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles, jenkinsFiles], 'SequelizeProject');
  });

  test.each([...sequelizeTemplateFiles, '.woloxci/config.yml'])('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});
