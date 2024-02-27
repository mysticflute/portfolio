import { jest } from '@jest/globals';

/**
 * Returns a mock implementation of window.IntersectionObserver, with the given
 * options and functions mocked with `jest.fn`.
 */
export function getMockIntersectionObserver() {
  return jest.fn((options: IntersectionObserverInit = {}) => {
    const mockObserver: IntersectionObserver = {
      root: options.root || null,
      rootMargin: options.rootMargin || '',
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold ?? 0],
      observe: jest.fn(() => {}),
      unobserve: jest.fn(() => {}),
      disconnect: jest.fn(() => {}),
      takeRecords: jest.fn<() => IntersectionObserverEntry[]>(),
    };
    return mockObserver;
  });
}
