const { spawn } = require('child_process'),
  ora = require('ora');

exports.runCommand = ({ name, args, description = name, options = { verbose: false }, spawnOptions }) =>
  new Promise((resolve, reject) => {
    const command = spawn(name, args, spawnOptions);
    const spinner = ora(options.spinner || { text: description }).start();
    const result = [];

    const handleDataResponse = data => {
      const dataAsString = data.toString();
      result.push(dataAsString);
      if (options.verbose) {
        spinner.info(dataAsString);
      }
    };

    command.stdout.on('data', handleDataResponse);
    command.stderr.on('data', handleDataResponse);

    command.on('close', code => {
      if (code === 0) {
        spinner.succeed(options.successMessage);
        resolve(result);
      } else {
        spinner.fail(options.failMessage);
        reject(result);
      }
    });
  });
