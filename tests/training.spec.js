const helpers = require('yeoman-test'),
  command = require('../generators/app/command');

let spy;

describe('generates a basic training project', () => {
  beforeAll(() => {
    spy = jest.spyOn(command, 'runCommand').mockImplementation(() => {
      Promise.resolve();
    });
  });
  test('has training project structure', () => {
    return helpers
      .run(require.resolve('../generators/app'))
      .withPrompts({ inTraining: true, urlRepository: 'https://test.com.ar' })
      .then(dir => {
        expect(spy).toBeCalledTimes(5);
      });
  });
});
