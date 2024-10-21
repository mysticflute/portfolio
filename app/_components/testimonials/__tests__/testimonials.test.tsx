import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Testimonials from '../testimonials';

describe('testimonials', () => {
  it('displays the heading', () => {
    render(<Testimonials />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      /what my clients say about/i,
    );
  });

  it('displays the carousel', () => {
    render(<Testimonials />);

    expect(
      screen.getByRole('group', { name: 'Testimonials' }),
    ).toBeInTheDocument();
  });
});
