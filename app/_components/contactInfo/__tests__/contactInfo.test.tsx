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
import ContactInfo from '../contactInfo';

describe('contactInfo', () => {
  let mockIntersectionObserver: jest.Mock<() => IntersectionObserver>;

  beforeEach(() => {
    mockIntersectionObserver = getMockIntersectionObserver();
    global.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    mockIntersectionObserver.mockReset();
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
