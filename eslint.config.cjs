const { rules } = require('eslint-config-love')

module.exports = [
  {
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...rules,
      'quotes': [2, 'single'],
      'semi': [2, 'never'],
      '@typescript-eslint/class-methods-use-this': 0,
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
]
