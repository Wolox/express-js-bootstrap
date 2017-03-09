const fs = require('fs');

exports.init = (responsible) => {

  const license = 'LICENSE';
  fs.readFile(license, 'utf8', (readErr, data) => {

    if (readErr) return console.log(err); // eslint-disable-line

    const result = data.replace(/Michel Agopian <michel.agopian@wolox.com.ar>/g, responsible);

    fs.writeFile(license, result, 'utf8', (writeErr) => {
      if (writeErr) return console.log(err); // eslint-disable-line
    });
  });
}
