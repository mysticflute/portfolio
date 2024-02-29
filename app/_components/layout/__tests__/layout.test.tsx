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
import Layout from '../layout';

describe('layout', () => {
  let mockIntersectionObserver: jest.Mock<() => IntersectionObserver>;

  beforeEach(() => {
    mockIntersectionObserver = getMockIntersectionObserver();
    global.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    mockIntersectionObserver.mockReset();
  });

  it('renders the header', () => {
    render(<Layout>content</Layout>);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the main section', () => {
    render(<Layout>content</Layout>);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders child content within the main section', () => {
    render(<Layout>content</Layout>);

    expect(screen.getByRole('main')).toHaveTextContent('content');
  });

  it('renders the footer', () => {
    render(<Layout>content</Layout>);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
