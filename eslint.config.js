import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  ignores: [
    'node_modules',
    'dist',
    'public',
  ],
  rules: {
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
    'no-async-promise-executor': 'off',
    'prefer-spread': 'off',
    'no-case-declarations': 'off',
    'one-var': 'off',
    'unicorn/prefer-includes': 'off',
    'no-console': 'off',
    'unicorn/no-new-array': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'symbol-description': 'off',
    'prefer-promise-reject-errors': 'off',
    'array-callback-return': 'off',
    'curly': ['error', 'all'],
    'jsdoc/check-alignment': 'off',
    'ts/no-use-before-define': 'off',
    'ts/method-signature-style': 'off',
    'ts/consistent-type-definitions': 'off',
    'style/jsx-curly-brace-presence': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-curly-newline': 'off',
    'style/jsx-closing-tag-location': 'off',
    'style/brace-style': ['error', '1tbs'],
    'style/arrow-parens': ['error', 'always'],
    'style/no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 0,
    }],
    'antfu/consistent-list-newline': 'off',
    'antfu/top-level-function': 'off',
    'antfu/if-newline': 'off',
  },
})
