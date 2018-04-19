const fs = require('fs');

exports.init = () => {
  const path = './app/models/';
  const remaining = ['index.js'];

  fs.readdirSync(path).forEach((elem, index) => {
    if (!remaining.includes(elem)) {
      fs.unlink(`${path}/${elem}`);
    }
  });

  if (remaining.length === 0) {
    fs.writeFile(`${path}/.keep`, '', 'utf8');
  }
};
