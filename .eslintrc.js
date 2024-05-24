module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-trailing-spaces': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      plugins: ['jest'],
      extends: ['plugin:jest/style'],
      // enable this after turning on typed-checked linting
      // rules: {
      //   '@typescript-eslint/unbound-method': 'off',
      //   'jest/unbound-method': 'error',
      // },
    },
    // enable this after turning on typed-checked linting
    // {
    //   extends: ['plugin:@typescript-eslint/disable-type-checked'],
    //   files: ['.eslintrc.js'],
    // },
  ],
};
