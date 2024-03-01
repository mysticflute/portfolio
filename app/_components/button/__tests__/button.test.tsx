import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Button from '../button';

describe('button', () => {
  it('renders a link', () => {
    render(
      <Button href="/foo" type="primary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders the link url', () => {
    render(
      <Button href="/foo" type="primary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/foo');
  });

  it('renders the link text', () => {
    render(
      <Button href="/foo" type="primary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveTextContent('foo');
  });

  it('renders nested child content', () => {
    render(
      <Button href="/foo" type="primary">
        <span className="icon"></span>
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toContainHTML('<span class="icon" />');
  });

  it('adds the base class name', () => {
    render(
      <Button href="/foo" type="primary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveClass(/base/);
  });

  it('renders the link with type=primary', () => {
    render(
      <Button href="/foo" type="primary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveClass('primary');
  });

  it('renders the link with type=secondary', () => {
    render(
      <Button href="/foo" type="secondary">
        foo
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveClass('secondary');
  });
});
