const {merge} = require('lodash'),
 eslintConfig = require('eslint-config-wolox');
module.exports = merge(eslintConfig, 
  {
    rules: {
      "arrow-parens": ["error", "as-needed"],
      "arrow-spacing": ['error', { before: true, after: true }],
      "camelcase": 0,
      "max-len": ["error", { "code": 120 }],
      "max-nested-callbacks": 0,
      "max-params": ["error", 4],
      "no-magic-numbers": 0,
    }
  }
)
