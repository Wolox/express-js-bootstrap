const fs = require('fs');

exports.init = () => {
  const path = './docs/';

  fs.readdirSync(path).forEach(elem => {
    fs.unlink(`${path}/${elem}`);
  });

  fs.writeFile(`${path}/.keep`, '', 'utf8');
};
