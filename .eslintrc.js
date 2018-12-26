const {merge} = require('lodash'),
 eslintConfig = require('eslint-config-wolox');
module.exports = eslintConfig;

// merge(eslintConfig, {rules: {"max-nested-callbacks": ["error", { max: 12 }]}})

/*
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
  */
