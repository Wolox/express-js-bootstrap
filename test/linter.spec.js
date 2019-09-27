const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { examplePrompts, commands } = require('./helpers/constants'),
  { runCommand } = require('../generators/app/command');
// commands = utils.getCommands();

describe.only('run linter', () => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({ ...examplePrompts, inTraining: true });
  });
  test.each(commands)('validate that there are no errors when generating the training files', command => {
    jest.setTimeout(10000);
    const directory = utils.getTestDirectory('WTraining');
    return runCommand({ ...command, spawnOptions: { cwd: directory } }).then(res => {
      const errors = unescape(res);
      const problems = errors.search('✖ 1 problem');
      expect(problems).toBe(-1);
    });
  });
});
