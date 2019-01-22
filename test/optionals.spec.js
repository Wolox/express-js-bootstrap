const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const optionals = [
  ['rollbar', ['package.json', 'app.js']],
  ['cors', ['package.json', 'app.js']],
  ['coveralls', ['package.json']]
];

describe.each(optionals)('Project with %s', (optionalFeature, files) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      projectName: 'OptionalProject',
      optionalsFeatures: { [optionalFeature]: true }
    })
  );

  test.each(files)('creates expected %s', file => {
    expect(utils.getFileContent(`OptionalProject/${file}`)).toMatchSnapshot();
  });
});
