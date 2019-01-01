const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    sequelizeFiles,
    travisFiles,
    herokuFiles,
    jenkisFiles,
    dockerFiles,
    examplePrompts
  } = require('./helpers/constants');

describe('WTraining project', () => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({ ...examplePrompts, inTraining: true });
  });
  test('creates training files', () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles, travisFiles, herokuFiles], 'WTraining');
    utils.checkNonExistentFiles([jenkisFiles, dockerFiles], 'WTraining');
  });
});
