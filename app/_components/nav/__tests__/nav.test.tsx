import { lazy } from 'react';
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  expect,
  it,
} from '@jest/globals';
import { render, screen, act, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { type InternalLink } from '../links';

// Importing `jest` from @jest/globals along with using swc (the default for
// next.js) breaks mocks: https://github.com/vercel/next.js/issues/43888.
//
// Lazy loading the component allows the mock of `next/navigation` to happen
// before the import. If this gets fixed, the `findBy*` in the tests can be
// replaced with `getBy*`.
const Nav = lazy(() => import('../nav'));

export const testNavLinks: InternalLink[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'portfolio', label: 'Portfolio', path: '/portfolio' },
];

describe('nav', () => {
  let mockUsePathname = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();

    mockUsePathname = jest.fn();
    jest.mock('next/navigation', () => ({
      usePathname: () => mockUsePathname(),
    }));
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('displays the logo link', async () => {
    render(<Nav links={testNavLinks} />);

    expect(
      await screen.findByRole('link', { name: 'Nathan David McWilliams' }),
    ).toBeInTheDocument();
  });

  it('displays the specified links', async () => {
    render(<Nav links={testNavLinks} />);

    for (const link of testNavLinks) {
      expect(
        await screen.findByRole('link', { name: link.label }),
      ).toBeInTheDocument();
    }
  });

  it('adds aria-current to link for the current page', async () => {
    mockUsePathname.mockImplementation(() => '/about');

    render(<Nav links={testNavLinks} />);

    expect(
      await screen.findByRole('link', { current: 'page' }),
    ).toHaveAttribute('href', '/about');
  });

  it('displays the contact button', async () => {
    render(<Nav links={testNavLinks} />);

    expect(
      await screen.findByRole('img', { name: 'Contact' }),
    ).toBeInTheDocument();
  });

  describe('overlay', () => {
    /**
     * Finds the toggle button and overlay container elements.
     *
     * @returns An array with the first element being the button and the second
     * the overlay container.
     */
    async function findOverlayElements() {
      const button = await screen.findByRole('button', {
        name: /(open|close) main menu/i,
      });
      const overlay = await screen.findByTestId('nav-overlay');
      return [button, overlay];
    }

    /** Opens or closes the overlay. */
    async function toggleOverlay(user: UserEvent) {
      const [button] = await findOverlayElements();

      await act(async () => {
        await user.click(button);
      });

      act(() => {
        jest.runAllTimers();
      });
    }

    it('open and closes', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Nav links={testNavLinks} />);

      const [button, overlay] = await findOverlayElements();

      // initially closed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(overlay).not.toHaveClass('open');

      // open it
      await toggleOverlay(user);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(overlay).toHaveClass('open');

      // close it
      await toggleOverlay(user);

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(overlay).not.toHaveClass('open');
    });

    it('moves the list of nav items when opened', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Nav links={testNavLinks} />);

      const [, overlay] = await findOverlayElements();

      // nav links list should be in the nav bar
      expect(within(overlay).queryByRole('list')).not.toBeInTheDocument();

      await toggleOverlay(user);

      // nav links list should be in the overlay
      expect(within(overlay).queryByRole('list')).toBeInTheDocument();
    });

    it('closes with the escape key', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Nav links={testNavLinks} />);

      const [button] = await findOverlayElements();

      await toggleOverlay(user);

      expect(button).toHaveAttribute('aria-expanded', 'true');

      // focus an item in the overlay so that hitting the Escape key fires an
      // event from within the overlay container.
      const link = await screen.findByRole('link', { name: 'About' });
      link.focus();

      await act(async () => {
        await user.keyboard('{Escape}');
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes when clicking outside of it', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <div>
          <Nav links={testNavLinks} />
          <div style={{ padding: 100 }}>
            <button>Test</button>
          </div>
        </div>,
      );

      const [button] = await findOverlayElements();

      await toggleOverlay(user);

      expect(button).toHaveAttribute('aria-expanded', 'true');

      // clicking on an element outside of the overlay should result in the
      // overlay closing
      const outsideElement = await screen.findByRole('button', {
        name: 'Test',
      });

      await act(async () => {
        await user.click(outsideElement);
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
