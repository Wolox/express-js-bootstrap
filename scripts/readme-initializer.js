const fs = require('fs');

exports.init = (responsibleUsername, responsibleFullName, projectName, projectDescription) => {
  const readme = 'README.md';
  fs.readFile(readme, 'utf8', (readErr, data) => {
    if (readErr) return console.log(readErr); // eslint-disable-line

    let index;
    // Changing responsible name and username
    let result = data
      .replace(/Michel Agopian/g, responsibleFullName)
      .replace(/mishuagopian/g, responsibleUsername);

    result = result.toString();
    result = result.split('\n');

    // Replacing proyect name and description
    result[0] = `# ${projectName}`;
    result[2] = projectDescription;

    // Removing Contributing section
    index = result.indexOf('## Contributing');
    result.splice(index, 8);

    // Removing Kickoff section
    index = result.indexOf('## Kickoff - Removing sample project');
    result.splice(index, 3);

    // Removing License section
    index = result.indexOf('## License');
    result = result.splice(0, index - 1);

    result = result.join('\n');

    // Overwritting with new readme
    fs.writeFile(readme, result, 'utf8', writeErr => {
      if (writeErr) return console.log(writeErr); // eslint-disable-line
    });
  });
};
