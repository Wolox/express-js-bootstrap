const fs = require('fs');

exports.init = (responsibleUsername, responsibleFullName, projectName, projectDescription) => {

  const readme = 'README.md';
  fs.readFile(readme, 'utf8', (readErr, data) => {

    if (readErr) return console.log(err); // eslint-disable-line

    let index;
    let result = data.replace(/Michel Agopian/g, responsibleFullName).replace(/mishuagopian/g, responsibleUsername);

    result = result.toString();
    result = result.split('\n');

    result[0] = projectName;
    result[3] = projectDescription;

    index = result.indexOf('#### Database configuration') + 2;
    result[index] = result[index].replace(/express-js-bootstrap/g, projectName);

    index = result.indexOf('## Contributing');
    result.splice(index, 8);

    index = result.indexOf('## License');
    result = result.splice(0, index - 1)

    result = result.join('\n');

    fs.writeFile(readme, result, 'utf8', (writeErr) => {
      if (writeErr) return console.log(err); // eslint-disable-line
    });
  });
}
