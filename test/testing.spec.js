const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, examplePrompts, testingFiles, basicFilesGraphql } = require('./helpers/constants');

beforeAll(() => mockCommand());

const ciOptions = ['mocha-chai', 'jest-supertest'];

const testSnapshot = technology => testing => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      technology,
      projectName: 'TestingProject',
      testing
    })
  );

  test(`creates files for ${testing} project`, () => {
    if (technology === 'graphQL') {
      return utils.checkExistentFiles([basicFilesGraphql, testingFiles], 'TestingProject');
    }
    return utils.checkExistentFiles([basicFiles, testingFiles], 'TestingProject');
  });

  test.each(testingFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`TestingProject/${file}`)).toMatchSnapshot();
  });
};
describe.each(ciOptions)('%s project', testSnapshot('nodeJS'));
describe.each(ciOptions)('%s project', testSnapshot('graphQL'));
