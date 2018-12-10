const fs = require('fs');

exports.init = () => {
  const path = './docs/';

  fs.readdirSync(path).forEach(elem => {
    fs.unlinkSync(`${path}/${elem}`);
  });

  fs.writeFileSync(`${path}/.keep`, '', 'utf8');
};
