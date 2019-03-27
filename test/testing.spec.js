const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, examplePrompts, testingFiles } = require('./helpers/constants');

beforeAll(() => mockCommand());

const ciOptions = ['mocha-chai', 'jest-supertest'];

describe.each(ciOptions)('%s project', testing => {
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
    expect(utils.getFileContent(`TestingProject/${file}`)).toMatchSnapshot();
  });
});
