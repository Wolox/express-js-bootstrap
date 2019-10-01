const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { runCommand } = require('../generators/app/command'),
  { exampleProjects } = require('./helpers/constants'),
  commands = utils.getCommands();

describe.only.each(exampleProjects)('Example project with %s', (projectName, { kickoffOptions }) => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({
      ...kickoffOptions,
      nodeVersion: '8.9.12',
      npmVersion: '6.4.1',
      inTraining: false,
      projectName: 'Project',
      projectDescription: 'Project',
      urlRepository: 'https://test.com.ar'
    });
  });

  test.each(commands)('validate that there are no errors when generating the training files', command => {
    jest.setTimeout(15000);
    const directory = utils.getTestDirectory('Project');
    return runCommand({ ...command, spawnOptions: { cwd: directory } }).then(res => {
      const errors = unescape(res);
      const problems = errors.search('✖ 1 problem');
      expect(problems).toBe(-1);
    });
  });
});
