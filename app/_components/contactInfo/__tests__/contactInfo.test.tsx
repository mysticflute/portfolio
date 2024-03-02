import { beforeEach, afterEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {
  initializeObserverMocks,
  resetObserverMocks,
} from '@/tests/lib/jest/intersectionObserver';
import ContactInfo from '../contactInfo';

describe('contactInfo', () => {
  beforeEach(() => {
    initializeObserverMocks();
  });

  afterEach(() => {
    resetObserverMocks();
  });

  it('renders a heading', () => {
    render(<ContactInfo />);

    expect(screen.getByRole('heading')).toHaveTextContent(/Contact me/i);
  });

  it('renders a link with mailto:', () => {
    render(<ContactInfo />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:'),
    );
  });
});
