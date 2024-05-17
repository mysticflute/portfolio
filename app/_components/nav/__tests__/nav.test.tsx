import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type InternalLink } from '../links';
import Nav from '../nav';

// @ts-expect-error: importing jest from @jest/globals breaks mocks.
// https://github.com/vercel/next.js/issues/43888
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// TODO: displays the logo link
// TODO: displays the specified links
// TODO: adds aria-current to the current page
// TODO: displays the contact button
// TODO: contact button has an aria-label
// TODO: opens and closes the overlay
// TODO: moves the nav from the bar to the overlay
// TODO: closes the overlay with escape key
// TODO: closes the overlay when clicking on a link
// TODO: closes the overlay when clicking outside of the nav

export const testNavLinks: InternalLink[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'portfolio', label: 'Portfolio', path: '/portfolio' },
];

describe('nav', () => {
  beforeAll(() => {
    // @ts-expect-error: importing jest from @jest/globals breaks mocks.
    jest.useFakeTimers();
  });

  afterAll(() => {
    // @ts-expect-error: importing jest from @jest/globals breaks mocks.
    jest.useRealTimers();
  });

  it('displays the logo link', () => {
    render(<Nav links={testNavLinks} />);

    expect(
      screen.getByRole('link', { name: 'Nathan David McWilliams' }),
    ).toBeInTheDocument();
  });

  // it('includes a link to the homepage', () => {
  //   render(<Nav />);

  //   // 1) home link around logo
  //   // 2) home link in nav
  //   // 3) home link in nav overlay
  //   expect(screen.getAllByRole('link', { name: 'Home' })).toHaveLength(3);
  // });

  // it('adds aria-current to the current page', () => {
  //   render(<Nav />);

  //   const links = screen.getAllByRole('link', { current: 'page' });

  //   links.forEach(link => {
  //     expect(link).toHaveAttribute('href', '/');
  //   });
  // });

  // it('open and closes the overlay', async () => {
  //   const user = userEvent.setup();

  //   render(<Nav />);

  //   const overlayButton = screen.getByRole('button', { name: 'Menu' });
  //   const navOverlay = screen.getByTestId('nav-overlay');

  //   expect(overlayButton).toHaveAttribute('aria-expanded', 'false');
  //   expect(navOverlay).not.toHaveClass('open');

  //   await user.click(overlayButton);
  //   expect(overlayButton).toHaveAttribute('aria-expanded', 'true');
  //   expect(navOverlay).toHaveClass('open');
  // });
});
