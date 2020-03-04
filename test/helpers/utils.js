const { flatten } = require('lodash');
const helpers = require('yeoman-test');
const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');

let testDirectory = path.join(__dirname, 'tmp');

exports.getTestDirectory = filePath => (filePath ? `${testDirectory}/${filePath}` : testDirectory);

exports.runKickoff = options =>
  helpers
    .run(require.resolve('../../generators/app'))
    .inTmpDir(dir => {
      testDirectory = dir;
    })
    .withPrompts(options)
    .toPromise();

const checkFiles = (checkFunction, files, directory) =>
  assert[checkFunction](flatten(files).map(file => exports.getTestDirectory(`${directory}/${file}`)));

exports.checkNonExistentFiles = (files, directory) => checkFiles('noFile', files, directory);

exports.checkExistentFiles = (files, directory) => checkFiles('file', files, directory);

exports.getFileContent = filePath =>
  fs.readFileSync(exports.getTestDirectory(filePath), { encoding: 'utf-8' });
