module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'semi': 0,
    "spaced-comment": [2, "always", {"exceptions": ["/-"], "markers": ["/"]}],
    'keyword-spacing': 0,
    'no-unreachable': 0,
    'no-new': 0,
    'no-multiple-empty-lines': 0,
    'padded-blocks': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
  }
}
