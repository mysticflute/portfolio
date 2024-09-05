import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MyStory from '../myStory';

describe('myValues', () => {
  it('renders a heading', () => {
    render(<MyStory />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('the my-story href matches a valid heading id', () => {
    render(<MyStory />);

    const link = screen.getByRole('link', { name: /my story/i });
    expect(link).toBeInTheDocument();

    const href = link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^#(.)+/);

    const hrefId = href!.substring(1);

    const target = screen.getByRole('heading', {
      name: /my story as a composer/i,
    });

    expect(target).toBeInTheDocument();
    expect(target.id).toBe(hrefId);
  });
});
