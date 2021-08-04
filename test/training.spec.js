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

const { TRAINING_CONFIG } = require('../generators/app/constants');

describe('WTraining project', () => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({ ...examplePrompts, inTraining: true });
  });
  test('creates training files', () => {
    utils.checkExistentFiles(
      [basicFiles, sequelizeFiles, travisFiles, herokuFiles],
      TRAINING_CONFIG.projectName
    );
    utils.checkNonExistentFiles([jenkisFiles, dockerFiles], TRAINING_CONFIG.projectName);
  });
});
