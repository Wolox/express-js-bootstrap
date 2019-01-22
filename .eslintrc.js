const {merge} = require('lodash'),
 eslintConfig = require('eslint-config-wolox');

module.exports = merge(eslintConfig, 
  {
    rules: {
        "max-nested-callbacks": 0, 
        "no-magic-numbers": 0,
        "no-extra-parens": [
            "error",
            "all",
            {
              ignoreJSX: "all",
              enforceForArrowConditionals: false,
              returnAssign: false,
              nestedBinaryExpressions: false
            }
        ]
    }
  }
)