const fs = require('fs');

exports.init = () => {
  const path = './test/';
  const remaining = ['app.js'];

  fs.readdirSync(path).forEach((elem, index) => {
    if (!remaining.includes(elem)) {
      fs.unlinkSync(`${path}/${elem}`);
    }
  });

  if (remaining.length === 0) {
    fs.writeFileSync(`${path}/.keep`, '', 'utf8');
  }
};
