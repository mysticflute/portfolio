import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import jest from 'eslint-plugin-jest';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  prettier,

  // override rules for all files
  {
    rules: {
      semi: 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-trailing-spaces': 'warn',
    },
  },

  // override rules for TypeScript files
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      'no-undef': 'off',
    },
  },

  // override rules for test files
  {
    files: ['*.test.ts', '*.test.tsx'],
    ...jest.configs['flat/recommended'],
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
