const fs = require('fs');

exports.init = () => {
  const path = './app/middlewares/';
  const remaining = ['errors.js'];

  fs.readdirSync(path).forEach((elem) => {
    if (!remaining.includes(elem)) {
      fs.unlinkSync(`${path}/${elem}`);
    }
  });

  if (remaining.length === 0) {
    fs.writeFileSync(`${path}/.keep`, '', 'utf8');
  }
};
