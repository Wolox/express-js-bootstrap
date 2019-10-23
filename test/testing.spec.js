const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, examplePrompts, testingFiles, basicFilesGraphql } = require('./helpers/constants');

beforeAll(() => mockCommand());

const testOptions = [
  ['mocha-cha', 'expressJS'],
  ['jest-supertest', 'expressJS'],
  ['mocha-cha', 'graphQL'],
  ['jest-supertest', 'graphQL']
];

describe.each(testOptions)('%s project', (testing, technology) => {
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
});
