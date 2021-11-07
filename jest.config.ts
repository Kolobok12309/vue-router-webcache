import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: '@nuxt/test-utils',
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.ts',
  ],
};

export default config;
