const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const deployOptions = [
  ['docker', { files: ['Dockerfile'], kickoffOptions: { docker: true, deployStrategy: { aws: false } } }],
  [
    'docker and aws',
    {
      files: ['Dockerfile', 'Dockerrun.aws.json'],
      kickoffOptions: { docker: true, deployStrategy: { aws: true } }
    }
  ],
  [
    'heroku',
    { files: ['Procfile'], kickoffOptions: { docker: false, deployStrategy: { aws: false, heroku: true } } }
  ]
];

describe.each(deployOptions)('Deploy with %s', (deployOption, { files, kickoffOptions }) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      ...kickoffOptions,
      projectName: 'DeployProject'
    })
  );

  test(`creates files for ${deployOption}`, () => {
    utils.checkExistentFiles(files, 'DeployProject');
  });

  test.each(files)('creates expected %s', file => {
    expect(utils.getFileContent(`DeployProject/${file}`)).toMatchSnapshot();
  });
});
