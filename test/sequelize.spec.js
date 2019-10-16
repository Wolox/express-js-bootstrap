const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    sequelizeFiles,
    basicFilesGraphql,
    sequelizeFilesGraphql,
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

const availableDialects = ['mysql', 'postgres', 'mssql', 'sqlite'];

describe.each(availableDialects)('Sequelize project (%s)', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, 'nodeJS'));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles], 'SequelizeProject');
  });

  test.each(sequelizeTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});

describe.each(availableDialects)('Sequelize project (%s) along with Jenkins', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, 'nodeJS', { ci: 'jenkins' }));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles, jenkinsFiles], 'SequelizeProject');
  });

  test.each([...sequelizeTemplateFiles, '.woloxci/config.yml'])('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});

describe.each(availableDialects)('Sequelize project (%s)', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, 'graphQL'));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFilesGraphql, sequelizeFilesGraphql], 'SequelizeProject');
  });

  test.each(sequelizeTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});

describe.each(availableDialects)('Sequelize project (%s) along with Jenkins', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, 'graphQL', { ci: 'jenkins' }));

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFilesGraphql, sequelizeFilesGraphql, jenkinsFiles], 'SequelizeProject');
  });

  test.each([...sequelizeTemplateFiles, '.woloxci/config.yml'])('creates expected %s', file => {
    expect(utils.getFileContent(`SequelizeProject/${file}`)).toMatchSnapshot();
  });
});
