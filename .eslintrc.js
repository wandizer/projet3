module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
  },
  'rules': {
    // max line length redefine
    'max-len': ['error', { 'code': 200 }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // error on ; when they are not present
    'semi' : ['error', 'always'],
    // allow export and import
    'import/prefer-default-export': 0,
    // allow nested-ternary
    'no-nested-ternary': 0,
    // allow console
    'no-console': 0,
    // no camelcase rule
    'camelcase': 0,
    // no obligatory static methods
    'class-methods-use-this': 0,
    // no rule for no-multi-assign
    'no-multi-assign': 0,
    // no prefer-destructuring
    'prefer-destructuring': 0,
  }
};
