const fs = require('fs');

exports.init = () => {
  const path = './app/services/';
  fs.readdirSync(path).forEach(elem => {
    fs.unlinkSync(`${path}/${elem}`);
  });
  fs.writeFileSync(`${path}/.keep`, '', 'utf8');
};
