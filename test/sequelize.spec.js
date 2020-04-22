const { forIn, merge } = require('lodash');
const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const {
  basicFiles,
  sequelizeFiles,
  sequelizeTemplateFiles,
  jenkinsFiles,
  examplePrompts
} = require('./helpers/constants');
const { getDependenciesByName, semanticVersionRegex } = require('./helpers/dependencies');

const sequelizeKickoff = (dialect, options) =>
  utils.runKickoff({
    ...examplePrompts,
    projectName: 'SequelizeProject',
    projectDescription: 'SequelizeProject',
    orm: { sequelize: true },
    sequelizeVersion: '^1.1.2',
    sequelizeDialect: dialect,
    ...options
  });

beforeAll(() => mockCommand());

const availableDialects = ['mysql', 'postgres', 'mssql', 'sqlite'];

describe.each(availableDialects)('Sequelize project (%s)', dialect => {
  beforeAll(() => sequelizeKickoff(dialect));
  const { dependencies, devDependencies } = getDependenciesByName(dialect);
  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles], 'SequelizeProject');
  });

  test.each(sequelizeTemplateFiles)('creates expected %s', file => {
    const { fileContent, jsonData } = utils.getFileContent(`SequelizeProject/${file}`);
    expect(fileContent).toMatchSnapshot();
    if (jsonData.dependencies) {
      expect(Object.keys(jsonData.dependencies)).toEqual(expect.arrayContaining(dependencies));
      expect(Object.keys(jsonData.devDependencies)).toEqual(expect.arrayContaining(devDependencies));
      forIn(merge(jsonData.dependencies, jsonData.devDependencies), value => {
        expect(value).toMatch(semanticVersionRegex);
      });
    }
  });
});

describe.each(availableDialects)('Sequelize project (%s) along with Jenkins', dialect => {
  beforeAll(() => sequelizeKickoff(dialect, { ci: 'jenkins' }));
  const { dependencies, devDependencies } = getDependenciesByName(dialect);

  test(`creates sequelize files for ${dialect}`, () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles, jenkinsFiles], 'SequelizeProject');
  });

  test.each([...sequelizeTemplateFiles, '.woloxci/config.yml'])('creates expected %s', file => {
    const { fileContent, jsonData } = utils.getFileContent(`SequelizeProject/${file}`);
    expect(fileContent).toMatchSnapshot();
    if (jsonData.dependencies) {
      expect(Object.keys(jsonData.dependencies)).toEqual(expect.arrayContaining(dependencies));
      expect(Object.keys(jsonData.devDependencies)).toEqual(expect.arrayContaining(devDependencies));
      forIn(merge(jsonData.dependencies, jsonData.devDependencies), value => {
        expect(value).toMatch(semanticVersionRegex);
      });
    }
  });
});
