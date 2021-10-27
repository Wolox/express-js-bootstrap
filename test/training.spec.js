const utils = require('./helpers/utils');
const { mockCommand } = require('./helpers/mocks');
const {
  basicFiles,
  sequelizeFiles,
  travisFiles,
  herokuFiles,
  jenkisFiles,
  dockerFiles,
  examplePrompts
} = require('./helpers/constants');

describe('w-training project', () => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({ ...examplePrompts, inTraining: true });
  });
  test('creates training files', () => {
    utils.checkExistentFiles([basicFiles, sequelizeFiles, travisFiles, herokuFiles], 'w-training');
    utils.checkNonExistentFiles([jenkisFiles, dockerFiles], 'w-training');
  });
});
