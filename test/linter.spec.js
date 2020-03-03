const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const { runCommand } = require('../generators/app/command');
const { exampleProjects } = require('./helpers/constants');

const commands = utils.getLinterCommands();

describe.each(exampleProjects)('Example project with %s', (projectName, { kickoffOptions }) => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({
      ...kickoffOptions,
      nodeVersion: '8.9.12',
      npmVersion: '6.4.1',
      inTraining: false,
      projectName: 'linterTest',
      projectDescription: 'Fake project to test linter',
      urlRepository: 'https://test.com.ar'
    });
  });

  test.each(commands)('run the EsLinter for each project generated', command => {
    jest.setTimeout(15000);
    const directory = utils.getTestDirectory('linterTest');
    return runCommand({ ...command, spawnOptions: { cwd: directory } }).catch(() => {
      throw new Error('Eslinter for project failed on command', command);
    });
  });
});
