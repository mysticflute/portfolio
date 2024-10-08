/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  displayName: 'component tests',

  // don't match helper files in __tests__ directories
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/$1',
  },

  // don't collect coverage on helper files in __tests__ directories.
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
};

export default createJestConfig(config);
