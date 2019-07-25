const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, mongooseTemplateFiles, examplePrompts } = require('./helpers/constants');

const mongooseKickoff = options =>
  utils.runKickoff({
    ...examplePrompts,
    projectName: 'MongooseProject',
    projectDescription: 'MongooseProject',
    orm: { mongoose: true },
    mongooseVersion: '5.6.4',
    mongooseDialect: 'mongoDB',
    ...options
  });

beforeAll(() => mockCommand());

describe('Mongoose project ', () => {
  beforeAll(() => mongooseKickoff());

  test('creates basic files and does not create sequelize files', () => {
    utils.checkExistentFiles([basicFiles], 'MongooseProject');
    utils.checkNonExistentFiles(
      [['.sequelizerc', 'migrations/index.js', 'migrations/migrations/.keep', 'app/models/index.js']],
      'MongooseProject'
    );
  });

  test.each(mongooseTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`MongooseProject/${file}`)).toMatchSnapshot();
  });
});
