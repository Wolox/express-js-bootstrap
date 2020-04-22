const { forIn, merge } = require('lodash');

const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const { basicFiles, examplePrompts, testingFiles } = require('./helpers/constants');
const { getDependenciesByName, semanticVersionRegex } = require('./helpers/dependencies');

beforeAll(() => mockCommand());

const ciOptions = ['mocha-chai', 'jest-supertest'];

describe.each(ciOptions)('%s project', testing => {
  const { dependencies, devDependencies } = getDependenciesByName(testing);
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      projectName: 'TestingProject',
      testing
    })
  );

  test(`creates files for ${testing} project`, () => {
    utils.checkExistentFiles([basicFiles, testingFiles], 'TestingProject');
  });
  test.each(testingFiles)('creates expected %s', file => {
    const { fileContent, jsonData } = utils.getFileContent(`TestingProject/${file}`);
    expect(fileContent).toMatchSnapshot();
    expect(Object.keys(jsonData.dependencies)).toEqual(expect.arrayContaining(dependencies));
    expect(Object.keys(jsonData.devDependencies)).toEqual(expect.arrayContaining(devDependencies));
    forIn(merge(jsonData.dependencies, jsonData.devDependencies), value => {
      expect(value).toMatch(semanticVersionRegex);
    });
  });
});
