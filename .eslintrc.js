module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    semi: 'error',
    quotes: ['error', 'single'],
    'no-trailing-spaces': 'warn',
  },
};
