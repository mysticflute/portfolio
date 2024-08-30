import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import HighlightList from '../highlightList';

describe('highlightList', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <HighlightList>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </HighlightList>,
    );

    expect(container).toMatchSnapshot();
  });

  it('adds the custom class name', () => {
    render(
      <HighlightList className="customclass">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </HighlightList>,
    );

    expect(screen.getByRole('list')).toHaveClass('customclass');
  });
});
