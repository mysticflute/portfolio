import { jest } from '@jest/globals';
import { act } from '@testing-library/react';

/**
 * Metadata about instances created via `new IntersectionObserver()`.
 */
type ObserverMetadata = {
  /**
   * The callback function given during initiation.
   */
  callback: IntersectionObserverCallback;

  /**
   * The elements currently observed by the observer instance.
   */
  observedElements: Set<Element>;
};

const allObservers = new Map<IntersectionObserver, ObserverMetadata>();

let globalMock: jest.Mock<any> | null = null;

/**
 * Mock the global/window `IntersectionObserver`.
 *
 * After invoking this method, all calls to `new IntersectionObserver()` will
 * return a mocked `IntersectionObserver` instance. The instance methods such as
 * `observe` and `disconnect` are jest mocks that can be spied on.
 *
 * This should usually be called in `beforeEach`. Be sure to call
 * {@link resetObserverMocks} in `afterEach` as well.
 */
export function initializeObserverMocks() {
  globalMock = jest.fn(
    (
      callback: IntersectionObserverCallback,
      options: IntersectionObserverInit = {},
    ) => {
      const metadata: ObserverMetadata = {
        callback,
        observedElements: new Set<Element>(),
      };

      const mockObserver: IntersectionObserver = {
        root: options.root || null,
        rootMargin: options.rootMargin || '',
        thresholds: Array.isArray(options.threshold)
          ? options.threshold
          : [options.threshold ?? 0],
        observe: jest.fn((element: Element) => {
          metadata.observedElements.add(element);
        }),
        unobserve: jest.fn((element: Element) => {
          metadata.observedElements.delete(element);
        }),
        disconnect: jest.fn(() => {
          allObservers.delete(mockObserver);
        }),
        takeRecords: jest.fn<() => IntersectionObserverEntry[]>(),
      };

      allObservers.set(mockObserver, metadata);

      return mockObserver;
    },
  );

  global.IntersectionObserver = globalMock;
}

/**
 * Clears any mocks for `IntersectionObserver`.
 */
export function resetObserverMocks() {
  globalMock?.mockReset();
  allObservers.clear();
}

/**
 * Get all `IntersectionObserver` instances that are observing the given
 * element.
 *
 * @param element The element that's being observed.
 * @returns All instances observing the given element.
 */
export function getObserversForElement(element: Element) {
  const observers: IntersectionObserver[] = [];

  allObservers.forEach((metadata, observer) => {
    if (metadata.observedElements.has(element)) {
      observers.push(observer);
    }
  });

  return observers;
}

/**
 * Mock an intersecting event for a given element.
 *
 * @param element The element that's being observed.
 * @param isIntersecting Whether the element is intersecting.
 */
export function setIsElementIntersecting(
  element: Element,
  isIntersecting: boolean,
) {
  getObserversForElement(element).forEach(observer => {
    const entries: IntersectionObserverEntry[] = [
      {
        isIntersecting,
        target: element,

        // this is partially accurate, but doesn't account for thresholds.
        // implement this if testing threshold/ratio behavior.
        intersectionRatio: isIntersecting ? 1 : 0,

        // these are potentially invalid values!
        // implement before testing behavior based on them.
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRect: element.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      },
    ];

    act(() => {
      allObservers.get(observer)?.callback(entries, observer);
    });
  });
}
