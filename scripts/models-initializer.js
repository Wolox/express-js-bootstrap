const fs = require('fs');

exports.init = () => {

  const path = './app/models/';
  fs.readdirSync(path).forEach((elem, index) => {
    const currentPath = `${path}/${elem}`;
    if (fs.lstatSync(currentPath).isFile()) {
      fs.unlink(currentPath);
    }
  });

  const data = '// const model = require(\'./model\');\n\n'
    + 'exports.define = (db) => {\n'
    + '  // model.getModel(db);\n'
    + '};\n';
  const models = 'models.js';
  fs.writeFile(`${path}/${models}`, data, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err); // eslint-disable-line
  });

  const testingData = '\nexports.execute = (db) => {\n\n'
    + '  // This function should create data for testing and return a promise\n\n'
    + '};\n';
  const dataCreation = 'scripts/dataCreation.js';
  fs.writeFile(`${path}/${dataCreation}`, testingData, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err); // eslint-disable-line
  });
};
