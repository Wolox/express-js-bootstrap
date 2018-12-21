const {merge} = require('lodash'),
 eslintConfig = require('eslint-config-wolox');
module.exports = ({...{rules: eslintConfig.rules}, 
  ...{
    "parser": "babel-eslint",          // https://github.com/babel/babel-eslint
    "parserOptions": {
    "sourceType": "module"
    },
    "env": {                           // http://eslint.org/docs/user-guide/configuring.html#specifying-environments
      "node": true,                    // node global variables
      "mocha": true,                   // mocha keywords
      "es6": true
    }
  }});
