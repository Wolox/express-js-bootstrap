const command = require('../../generators/app/command');

exports.mockCommand = (implementation = () => Promise.resolve()) =>
  jest.spyOn(command, 'runCommand').mockImplementation(implementation);
