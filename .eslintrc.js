module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recom ended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals'
  ],
  rules: {
    'semi': ['error', 'always']
  }
}
