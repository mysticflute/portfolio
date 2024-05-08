import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import FeaturedWork from '../featuredWork';

describe('featuredWork', () => {
  it('has a title', () => {
    render(<FeaturedWork />);

    expect(
      screen.getByRole('region', { name: 'Featured Work' }),
    ).toBeInTheDocument();
  });

  it('renders expected items', () => {
    render(<FeaturedWork />);

    expect(screen.getByRole('list')).toHaveTextContent(/Turning/i);
  });
});
