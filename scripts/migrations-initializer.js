const fs = require('fs');

exports.init = () => {
  const path = './migrations/migrations/';

  fs.readdirSync(path).forEach(file => {
    fs.unlinkSync(`${path}/${file}`);
    fs.writeFileSync(`${path}/.keep`, '', 'utf8');
  });
};
