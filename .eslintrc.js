module.exports = {
  env: {
    es2020: true,
    jasmine: true,
    node: true
  },
  plugins: [
    'jasmine',
    'jsdoc'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jasmine/recommended',
    'plugin:jsdoc/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    "jasmine/no-spec-dupes": "off",
    "jasmine/no-suite-dupes": "off"
  }
}
