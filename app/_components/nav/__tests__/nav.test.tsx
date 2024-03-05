import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '../nav';

// @ts-ignore: importing jest from @jest/globals breaks mocks.
// https://github.com/vercel/next.js/issues/43888
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('nav', () => {
  it('includes a link to the homepage', () => {
    render(<Nav />);

    // 1) home link around logo
    // 2) home link in nav
    // 3) home link in nav overlay
    expect(screen.getAllByRole('link', { name: 'Home' })).toHaveLength(3);
  });

  it('adds aria-current to the current page', () => {
    render(<Nav />);

    const links = screen.getAllByRole('link', { current: 'page' });

    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/');
    });
  });

  it('open and closes the overlay', async () => {
    const user = userEvent.setup();

    render(<Nav />);

    const overlayButton = screen.getByRole('button', { name: 'Menu' });
    const navOverlay = screen.getByTestId('nav-overlay');

    expect(overlayButton).toHaveAttribute('aria-expanded', 'false');
    expect(navOverlay).not.toHaveClass('open');

    await user.click(overlayButton);
    expect(overlayButton).toHaveAttribute('aria-expanded', 'true');
    expect(navOverlay).toHaveClass('open');
  });
});
