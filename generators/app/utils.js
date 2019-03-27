const mkdirp = require('mkdirp'),
  { URL_REGEX, VERSION_REGEX, APP_NAME_REGEX } = require('./constants');

exports.mkdirp = directory =>
  new Promise((resolve, reject) => {
    mkdirp(directory, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

exports.checkboxReducer = values =>
  values.reduce((answer, optional) => {
    answer[optional] = true;
    return answer;
  }, {});

exports.flattenPrompts = prompts =>
  prompts.reduce((listPrompts, actualPrompt) => {
    listPrompts.push(actualPrompt);
    if (actualPrompt.promptsNegative || actualPrompt.promptsPositive) {
      const newPrompts = [];
      const generateNewPrompt = (prompt, positive) => ({
        ...prompt,
        when: answers =>
          (actualPrompt.when ? actualPrompt.when(answers) : true) &&
          answers[actualPrompt.name] === positive &&
          (prompt.when ? prompt.when(answers) : true)
      });

      if (actualPrompt.promptsNegative) {
        newPrompts.push(
          ...actualPrompt.promptsNegative.map(promptNegative => generateNewPrompt(promptNegative, false))
        );
      }
      if (actualPrompt.promptsPositive) {
        newPrompts.push(
          ...actualPrompt.promptsPositive.map(promptPositive => generateNewPrompt(promptPositive, true))
        );
      }
      listPrompts.push(...exports.flattenPrompts(newPrompts));
    }

    return listPrompts;
  }, []);

const validateRegex = (regex, message) => value => regex.test(value) || message;

exports.validateUrl = validateRegex(URL_REGEX, 'Please enter a valid url');
exports.validateVersionNumber = validateRegex(
  VERSION_REGEX,
  'Please enter a valid version number (e.g. 1.2.3)'
);
exports.validateAppName = validateRegex(APP_NAME_REGEX, 'Please enter a valid app name (alphanumeric)');
