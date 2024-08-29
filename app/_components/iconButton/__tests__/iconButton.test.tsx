import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import IconButton from '../iconButton';

describe('iconButton', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <IconButton href="/foo" type="secondary" iconName="mail">
        foo
      </IconButton>,
    );

    expect(container).toMatchSnapshot();
  });

  it('passes through the inverse attribute', () => {
    render(
      <IconButton href="/foo" type="primary" inverse={true} iconName="mail">
        foo
      </IconButton>,
    );

    expect(screen.getByRole('link')).toHaveClass('inverse');
  });

  it('adds the custom class name', () => {
    render(
      <IconButton
        href="/foo"
        type="secondary"
        iconName="mail"
        className="customclass"
      >
        foo
      </IconButton>,
    );

    expect(screen.getByRole('link')).toHaveClass('customclass');
  });
});
