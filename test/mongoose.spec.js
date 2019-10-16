const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { basicFiles, mongooseTemplateFiles, examplePrompts, basicFilesGraphql } = require('./helpers/constants');

const technologys = ['nodeJS', 'graphQL'];

beforeAll(() => mockCommand());

describe.each(technologys)('Mongoose project ', (technology, options) => {
  beforeAll(() =>
    utils.runKickoff({
      ...examplePrompts,
      projectName: 'MongooseProject',
      technology,
      projectDescription: 'MongooseProject',
      orm: { mongoose: true },
      mongooseVersion: '5.6.4',
      mongooseDialect: 'mongoDB',
      ...options
    })
  );

  test('creates basic files and does not create sequelize files', () => {
    if (technology === 'graphQL') {
      utils.checkExistentFiles([basicFilesGraphql], 'MongooseProject');
      return utils.checkNonExistentFiles(
        [['.sequelizerc', 'migrations/index.js', 'app/models/index.js']],
        'MongooseProject'
      );
    }
    utils.checkExistentFiles([basicFiles], 'MongooseProject');
    return utils.checkNonExistentFiles(
      [['.sequelizerc', 'migrations/index.js', 'migrations/migrations/.keep', 'app/models/index.js']],
      'MongooseProject'
    );
  });

  test.each(mongooseTemplateFiles)('creates expected %s', file => {
    expect(utils.getFileContent(`MongooseProject/${file}`)).toMatchSnapshot();
  });
});
