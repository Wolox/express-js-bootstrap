const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const { examplePrompts } = require('./helpers/constants');

beforeAll(() => mockCommand());

const deployOptions = [
  ['docker', { files: ['Dockerfile'], kickoffOptions: { docker: true, deployStrategy: { aws: false } } }],
  [
    'docker and aws',
    {
      files: ['Dockerfile', 'Dockerrun.aws.json', '.ebextensions/cloudwatch.config'],
      kickoffOptions: { docker: true, deployStrategy: { aws: true } }
    }
  ],
  [
    'heroku',
    { files: ['Procfile'], kickoffOptions: { docker: false, deployStrategy: { aws: false, heroku: true } } }
  ],
  [
    'aws',
    {
      files: ['.ebextensions/cloudwatch.config'],
      kickoffOptions: { docker: true, deployStrategy: { aws: true } }
    }
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
