import { beforeEach, afterEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {
  initializeObserverMocks,
  resetObserverMocks,
} from '@/tests/lib/jest/intersectionObserver';
import Page from '../page';

describe('contact page', () => {
  beforeEach(() => {
    initializeObserverMocks();
  });

  afterEach(() => {
    resetObserverMocks();
  });

  it('renders a heading', () => {
    render(<Page />);

    expect(screen.getByRole('heading')).toHaveTextContent(/Contact me/i);
  });

  it('renders a link with mailto:', () => {
    render(<Page />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:'),
    );
  });
});
