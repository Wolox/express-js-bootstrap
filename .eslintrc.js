const {merge} = require('lodash'),
 eslintConfig = require('eslint-config-wolox');
module.exports = merge(eslintConfig, 
  {
    rules: {
        "max-nested-callbacks": ["error", { max: 12 }], 
        "no-magic-numbers": 0
    }
  }
)
