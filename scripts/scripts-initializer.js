const fs = require('fs');

exports.init = () => {
  const testingData =
    'exports.execute = () => {\n' +
    '  // This function should create data for testing and return a promise\n' +
    '};\n';
  fs.mkdirSync('./scripts');
  fs.writeFile('./scripts/dataCreation.js', testingData, 'utf8', writeErr => {
    if (writeErr) return console.log(writeErr); // eslint-disable-line
  });
};
