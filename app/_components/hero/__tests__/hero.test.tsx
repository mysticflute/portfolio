/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Hero from '../hero';

describe('button', () => {
  it('renders a heading', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the contact link', () => {
    render(<Hero />);

    expect(
      screen.getByRole('link', { name: 'Get in touch' }),
    ).toBeInTheDocument();
  });

  it('renders the view portfolio link', () => {
    render(<Hero />);

    expect(
      screen.getByRole('link', { name: 'View portfolio' }),
    ).toBeInTheDocument();
  });

  it('renders the avatar image(s)', () => {
    render(<Hero />);

    expect(screen.getAllByAltText(/nathan david mcwilliams/i)).toHaveLength(2);
  });
});
