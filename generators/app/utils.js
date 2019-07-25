const mkdirp = require('mkdirp');
const { flatten } = require('lodash');
const { URL_REGEX, VERSION_REGEX, APP_NAME_REGEX } = require('./constants');

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
    if (actualPrompt.promptsNegative || actualPrompt.promptsPositive || actualPrompt.chosen) {
      const newPrompts = [];
      const generateNewPrompt = (prompt, positive, hasSelected = false) => ({
        ...prompt,
        when: answers => {
          if (hasSelected && answers[actualPrompt.name] && answers[actualPrompt.name][hasSelected]) {
            return answers[actualPrompt.name][hasSelected];
          }
          return (
            (actualPrompt.when ? actualPrompt.when(answers) : true) &&
            answers[actualPrompt.name] === positive &&
            (prompt.when ? prompt.when(answers) : true)
          );
        }
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
      if (actualPrompt.chosen) {
        newPrompts.push(
          ...flatten(
            actualPrompt.chosen.map(seqOption => {
              const lift = seqOption.prompts;
              return lift.map(prom => generateNewPrompt(prom, true, seqOption.condition));
            })
          )
        );
      }
      listPrompts.push(...exports.flattenPrompts(newPrompts));
    }
    return listPrompts;
  }, []);

const validateRegex = (regex, message) => value => regex.test(value) || message;

exports.validateUrl = value => !value || validateRegex(URL_REGEX, 'Please enter a valid url')(value);
exports.validateVersionNumber = validateRegex(
  VERSION_REGEX,
  'Please enter a valid version number (e.g. 1.2.3)'
);
exports.validateAppName = validateRegex(APP_NAME_REGEX, 'Please enter a valid app name (alphanumeric)');
