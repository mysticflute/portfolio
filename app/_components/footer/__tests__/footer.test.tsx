import {
  jest,
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { getMockIntersectionObserver } from '@/lib/test-utils/intersectionObserver';
import Footer from '../footer';

describe('footer', () => {
  let mockIntersectionObserver: jest.Mock<() => IntersectionObserver>;

  beforeEach(() => {
    mockIntersectionObserver = getMockIntersectionObserver();
    global.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    mockIntersectionObserver.mockReset();
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
