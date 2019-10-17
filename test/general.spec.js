const { flatten } = require('lodash'),
  utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  { exampleProjectsGraphql } = require('./helpers/projects'),
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
    utils.checkExistentFiles(basicFiles, 'Project');
  });

  test.each(flatten([...templateFiles, ...basicFiles]))('creates expected %s', file => {
    expect(utils.getFileContent(`Project/${file}`)).toMatchSnapshot();
  });
};
const testSnapshotGraph = technology => (projectName, { kickoffOptions, files, templateFiles }) => {
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
    utils.checkExistentFiles(basicFilesGraphql, 'Project');
  });

  test.each(flatten([...templateFiles, ...basicFilesGraphql]))('creates expected %s', file => {
    expect(utils.getFileContent(`Project/${file}`)).toMatchSnapshot();
  });
};

describe.each(exampleProjects)('Example project with %s', testSnapshot('nodeJS'));
describe.each(exampleProjectsGraphql)('Example project with %s', testSnapshotGraph('graphQL'));
