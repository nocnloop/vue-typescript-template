module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none'
        },
        singleline: {
          delimiter: 'comma'
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/camelcase': 'off',
    'space-before-function-paren': [
      'error',
      {
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'eol-last': 'off'
  },
  globals: {
    globalConfig: true
  }
}
