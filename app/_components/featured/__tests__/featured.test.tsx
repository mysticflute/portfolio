import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Featured from '../featured';

const testItems = [
  'Featured One',
  'Featured Two',
  'Featured Three',
  'Featured Four',
  'Featured Five',
];

describe('featured', () => {
  it('renders all items', () => {
    render(<Featured items={testItems} />);

    const list = screen.getByRole('list');

    testItems.forEach(item => {
      expect(list).toHaveTextContent(item);
    });
  });

  it('renders lists equal to the specified count', () => {
    render(<Featured items={testItems} count={7} />);

    expect(screen.getAllByRole('list', { hidden: true })).toHaveLength(7);
  });

  it('adds animation class when animated is true', () => {
    render(<Featured items={testItems} animated />);

    expect(screen.getByRole('list')).toHaveClass('animated');
  });

  it('does not add animation class when animated is false', () => {
    render(<Featured items={testItems} animated={false} />);

    expect(screen.getByRole('list')).not.toHaveClass('animated');
  });

  it('only adds aria-hidden to lists after the first one', () => {
    render(<Featured items={testItems} count={3} />);

    const lists = screen.getAllByRole('list', { hidden: true });

    expect(lists[0]).not.toHaveAttribute('aria-hidden');
    expect(lists[1]).toHaveAttribute('aria-hidden', 'true');
    expect(lists[2]).toHaveAttribute('aria-hidden', 'true');
  });

  it('adds the title as the aria-label', () => {
    render(<Featured title="Featured Section" items={testItems} />);

    expect(
      screen.getByRole('region', { name: 'Featured Section' }),
    ).toBeInTheDocument();
  });

  it('adds an inline style for the specified duration', () => {
    render(
      <Featured
        title="section"
        items={testItems}
        animated={true}
        duration={30}
      />,
    );

    const section = screen.getByRole('region', { name: 'section' });
    expect(section).toHaveAttribute('style', expect.stringContaining('30s'));
  });
});
