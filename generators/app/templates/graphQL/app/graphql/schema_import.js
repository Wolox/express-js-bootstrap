const fs = require('fs'),
  path = require('path'),
  merge = require('lodash.merge');

const SCHEMA = 'schema';
const TYPE_DEFS = 'type_defs';
const RESOLVERS = 'resolvers';
const MIDDLEWARES = 'middlewares';

exports.importModules = () =>
  fs.readdirSync(__dirname, { withFileTypes: true }).reduce(
    (imports, dirent) => {
      if (dirent.isDirectory()) {
        fs.readdirSync(path.join(__dirname, dirent.name)).forEach(file => {
          const fileName = file.replace(/.js/gi, '');
          if (fileName === SCHEMA || fileName === TYPE_DEFS) {
            const { typeDefs = [] } = require(path.join(__dirname, dirent.name, fileName));
            imports.typeDefs.push(...typeDefs);
          }
          if (fileName === RESOLVERS) {
            const resolvers = require(path.join(__dirname, dirent.name, fileName));
            merge(imports.resolvers, resolvers);
          }
          if (fileName === MIDDLEWARES) {
            const middlewares = require(path.join(__dirname, dirent.name, fileName));
            merge(imports.middlewares, middlewares);
          }
        });
        return imports;
      }
      return imports;
    },
    { typeDefs: [], resolvers: {}, middlewares: {} }
  );
