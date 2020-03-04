const path = require('path');

const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const { runCommand } = require('../generators/app/command');
const { exampleProjects } = require('./helpers/constants');

const commands = [
  {
    description: 'Lint fix',
    name: 'npm',
    args: ['run', 'lint-external', '--', '--fix', '--no-eslintrc']
  },
  { description: 'Lint', name: 'npm', args: ['run', 'lint-external', '--', '--no-eslintrc'] }
];
const actualDirectory = path.resolve(__dirname);

describe.each(exampleProjects)('Example project with %s', (projectName, { kickoffOptions }) => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({
      ...kickoffOptions,
      nodeVersion: '8.9.12',
      npmVersion: '6.4.1',
      inTraining: false,
      projectName: 'linter',
      projectDescription: 'Fake project to test linter',
      urlRepository: 'https://test.com.ar'
    });
  });

  test.each(commands)('run the EsLinter for each project generated', command => {
    const directory = utils.getTestDirectory('linter');
    const args = [...command.args, `${directory}`];
    const projectRootDirectory = actualDirectory
      .split('/')
      .slice(0, -1)
      .join('/');
    return runCommand({
      ...command,
      args,
      spawnOptions: { cwd: projectRootDirectory }
    }).catch(err => {
      throw new Error(`Eslinter for project failed on command: ${command.description} with error: ${err}`);
    });
  });
});
