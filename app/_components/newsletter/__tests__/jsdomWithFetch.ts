import JSDOMEnvironment from 'jest-environment-jsdom';
import type { EnvironmentContext } from '@jest/environment';
import type { JestEnvironmentConfig } from '@jest/environment';

/**
 * Currently the jsdom environment doesn't support fetch:
 * https://github.com/jsdom/jsdom/issues/1724
 */
export default class JSDOMWithFetchEnvironment extends JSDOMEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.global.fetch = fetch;
  }
}
