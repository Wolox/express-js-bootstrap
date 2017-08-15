const fs = require('fs');

exports.init = () => {
  const path = './migrations/migrations/';

  fs.readdirSync(path).forEach(file => {
    fs.unlink(`${path}/${file}`);
    fs.writeFile(`${path}/.keep`, '', 'utf8');
  });
};
