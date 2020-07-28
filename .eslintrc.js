module.exports = {
  env: {
    es2020: true,
    node: true
  },
  plugins: [
    'jsdoc'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  }
}
