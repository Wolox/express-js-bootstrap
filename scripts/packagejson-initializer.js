const fs = require('fs');

exports.init = (responsibleFullName, projectName, projectDescription) => {
  const packagejson = 'package.json';
  fs.readFile(packagejson, 'utf8', (readErr, data) => {
    if (readErr) return console.log(readErr); // eslint-disable-line

    let result = JSON.parse(data);
    result.name = projectName;
    result.description = projectDescription;
    result.author = responsibleFullName;
    result.repository.url = `https://github.com/Wolox/${projectName}.git`;
    result.bugs = { url: `https://github.com/Wolox/${projectName}/issues` };
    result.homepage = `https://github.com/Wolox/${projectName}`;
    result = `${JSON.stringify(result, null, '  ')}\n`;

    fs.writeFile(packagejson, result, 'utf8', writeErr => {
      if (writeErr) return console.log(writeErr); // eslint-disable-line
    });
  });
};
