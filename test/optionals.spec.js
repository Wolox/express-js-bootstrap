const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const optionals = [
  ['rollbar', ['package.json', 'app.js']],
  ['cors', ['package.json', 'app.js']],
  ['coveralls', ['package.json']]
];

const optionalsGraphql = [
  ['rollbar', ['package.json']],
  ['cors', ['package.json']],
  ['coveralls', ['package.json']]
];

const testSnapshot = technology => (optionalFeature, files) => {
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
};

describe.each(optionals)('Project with %s', testSnapshot('nodeJS'));
describe.each(optionalsGraphql)('Project with %s', testSnapshot('graphQL'));
