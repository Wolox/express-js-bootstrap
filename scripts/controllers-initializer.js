const fs = require('fs');

exports.init = () => {
  const path = './app/controllers/';
  const remaining = ['healthCheck.js'];
  fs.readdirSync(path).forEach((elem, index) => {
    if (!remaining.includes(elem)) {
      fs.unlinkSync(`${path}/${elem}`);
    }
  });
  fs.writeFileSync(`${path}/.keep`, '', 'utf8');
};
