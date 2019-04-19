module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  },
  'rules': {
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
    'no-console': 0
  }
};
