import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: '@nuxt/test-utils',
  testPathIgnorePatterns: [
    '/node_modules/',
    // Prevent run files test/fixtures/nuxt/.nuxt/*/dist/server/pages/test.js through jest
    '/\\.nuxt/',
  ],
  collectCoverageFrom: [
    'lib/**/*\\.ts',
  ],
};

export default config;
