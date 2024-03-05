import { beforeEach, afterEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {
  initializeObserverMocks,
  resetObserverMocks,
} from '@/tests/lib/jest/intersectionObserver';
import Footer from '../footer';

describe('footer', () => {
  beforeEach(() => {
    initializeObserverMocks();
  });

  afterEach(() => {
    resetObserverMocks();
  });

  it('renders a copyright for the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`copyright © ${currentYear}`, 'i')),
    ).toBeInTheDocument();
  });

  it('renders the expected set of links', () => {
    render(<Footer />);

    const allLinks = screen
      .getAllByRole<HTMLLinkElement>('link')
      .map(l => l.href);

    expect(allLinks).toMatchSnapshot();
  });
});
