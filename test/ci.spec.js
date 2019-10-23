const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    basicFilesGraphql,
    jenkinsFiles,
    travisFiles,
    examplePrompts
  } = require('./helpers/constants');

beforeAll(() => mockCommand());

const ciOptions = [
  ['travis', 'expressJS', travisFiles],
  ['jenkins', 'expressJS', jenkinsFiles],
  ['travis', 'graphQL', travisFiles],
  ['jenkins', 'graphQL', jenkinsFiles]
];

describe.each(ciOptions)('%s project', (ciName, technology, files) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      technology,
      projectName: 'CIProject',
      ci: ciName
    })
  );

  test(`creates files for ${ciName} project`, () => {
    if (technology === 'graphQL') {
      return utils.checkExistentFiles([basicFilesGraphql, files], 'CIProject');
    }
    return utils.checkExistentFiles([basicFiles, files], 'CIProject');
  });

  test.each(files)('creates expected %s', file => {
    expect(utils.getFileContent(`CIProject/${file}`)).toMatchSnapshot();
  });
});
