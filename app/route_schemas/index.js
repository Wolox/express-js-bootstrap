const Ajv = require('ajv'),
  ajv = new Ajv({ allErrors: true }),
  pathToRegexp = require('path-to-regexp'),
  readdirp = require('readdirp'),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  dir = path.join(__dirname, 'root');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const loadPaths = () => {
  return new Promise((resolve, reject) => {
    const importSettings = {
      root: path.join(__dirname, 'root'),
      entryType: 'all'
    };
    const allFilePaths = [];
    readdirp(
      importSettings,
      fileInfo => {
        if (fileInfo.name === 'spec.js') {
          allFilePaths.push(fileInfo.parentDir);
        }
      },
      (err, res) => {
        if (err) reject(err);
        resolve(allFilePaths);
      }
    );
  });
};

module.exports = () => {
  return loadPaths().then(paths => {
    const schemas = paths.reduce((obj, p) => {
      obj[`/${p}`] = require(`./root/${p}/spec.js`);
      return obj;
    }, {});
    const validations = {};
    for (const key in schemas) {
      validations[key] = {};
      for (const method in schemas[key]) {
        validations[key][method] = ajv.compile(schemas[key][method]);
      }
    }
    return (req, res, next) => {
      const validationKey = Object.keys(validations).filter(v =>
        pathToRegexp(v).exec(url.parse(req.url).pathname)
      )[0];
      if (!validationKey || !validations[validationKey] || !validations[validationKey][req.method]) {
        throw new Error(`Schema for route '${req.method} - ${req.url}' is missing`);
      }
      const valid = validations[validationKey][req.method](req);
      if (valid) next();
      else throw new Error(ajv.errorsText(validations[validationKey][req.method].errors));
    };
  });
};
