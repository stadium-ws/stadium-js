module.exports = {
  extends: [
    "eslint:recommended",
    "turbo",
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  settings: {
    'import/internal-regex': '^stadium/'
  },
  rules: {
    'space-before-function-paren': ['error', 'always'],
    semi: ['error', 'never'],
    'no-console': ['error'],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', {avoidEscape: true}],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
      }
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/no-throw-literal': 'warn',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'unused-imports/no-unused-imports': 'warn',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  overrides: [
    {
      files: ["**/*.test.*"],
      env: {
        jest: true
      }
    }
  ]
}
