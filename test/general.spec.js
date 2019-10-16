const { flatten } = require('lodash'),
  utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { exampleProjects, basicFiles, basicFilesGraphql } = require('./helpers/constants');

beforeAll(() => mockCommand());

const testSnapshot = technology => (projectName, { kickoffOptions, files, templateFiles }) => {
  beforeAll(() =>
    utils.runKickoff({
      ...kickoffOptions,
      nodeVersion: '8.9.12',
      technology,
      npmVersion: '6.4.1',
      inTraining: false,
      projectName: 'Project',
      projectDescription: 'Project',
      urlRepository: 'https://test.com.ar'
    })
  );

  test(`creates basic files for ${projectName}`, () => {
    utils.checkExistentFiles(files, 'Project');
    if (technology === 'graphQL') {
      return utils.checkExistentFiles(basicFilesGraphql, 'Project');
    }
    return utils.checkExistentFiles(basicFiles, 'Project');
  });

  test.each(flatten([...templateFiles, ...basicFiles]))('creates expected %s', file => {
    expect(utils.getFileContent(`Project/${file}`)).toMatchSnapshot();
  });
};

describe.each(exampleProjects)('Example project with %s', testSnapshot('nodeJS'));
