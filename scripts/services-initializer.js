const fs = require('fs');

exports.init = () => {
  const path = './app/services/';
  fs.readdirSync(path).forEach((elem, index) => {
    fs.unlink(`${path}/${elem}`);
  });
  fs.writeFile(`${path}/.keep`, '', 'utf8');
};
