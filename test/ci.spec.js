const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, jenkinsFiles, travisFiles, examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const ciOptions = [['travis', travisFiles], ['jenkins', jenkinsFiles]];

describe.each(ciOptions)('%s project', (ciName, files) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      projectName: 'CIProject',
      ci: ciName
    })
  );

  test(`creates files for ${ciName} project`, () => {
    utils.checkExistentFiles([basicFiles, files], 'CIProject');
  });

  test.each(files)('creates expected %s', file => {
    expect(utils.getFileContent(`CIProject/${file}`)).toMatchSnapshot();
  });
});
