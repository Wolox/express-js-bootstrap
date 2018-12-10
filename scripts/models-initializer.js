const fs = require('fs');

exports.init = () => {
  const path = './app/models/';
  const remaining = ['index.js'];

  fs.readdirSync(path).forEach((elem, index) => {
    if (!remaining.includes(elem)) {
      fs.unlinkSync(`${path}/${elem}`);
    }
  });

  if (remaining.length === 0) {
    fs.writeFileSync(`${path}/.keep`, '', 'utf8');
  }
};
