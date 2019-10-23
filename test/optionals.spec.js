const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const optionals = [
  ['rollbar', 'expressJS', ['package.json', 'app.js']],
  ['cors', 'expressJS', ['package.json', 'app.js']],
  ['coveralls', 'expressJS', ['package.json']],

  ['rollbar', 'graphQL', ['package.json']],
  ['cors', 'graphQL', ['package.json']],
  ['coveralls', 'graphQL', ['package.json']]
];

describe.each(optionals)('Project with %s', (optionalFeature, technology, files) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      technology,
      projectName: 'OptionalProject',
      optionalsFeatures: { [optionalFeature]: true }
    })
  );

  test.each(files)('creates expected %s', file => {
    expect(utils.getFileContent(`OptionalProject/${file}`)).toMatchSnapshot();
  });
});
