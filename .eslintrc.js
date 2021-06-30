module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'quote-props': [
      'error',
      'consistent-as-needed'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-trailing-spaces': 'error',
    'semi-spacing': 'error',
    'space-infix-ops': 'error',
    'space-before-function-paren': 'error',
    'arrow-spacing': 'error',
    'eqeqeq': 2,
    'comma-style': [2, 'last'],
    'comma-dangle': [2, 'never'],
    'eol-last': ['error', 'always']
  }
}
