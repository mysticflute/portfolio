import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Icon from '../icon';

describe('button', () => {
  it('renders the correct class for the specified icon', () => {
    render(<Icon name="foo" />);

    expect(screen.getByTestId('icon')).toHaveClass('foo');
  });

  it('renders the correct class for hasTextAfter', () => {
    render(<Icon name="foo" hasTextAfter={true} />);

    expect(screen.getByTestId('icon')).toHaveClass('hasTextAfter');
  });

  it('renders the correct class for hasTextBefore', () => {
    render(<Icon name="foo" hasTextBefore={true} />);

    expect(screen.getByTestId('icon')).toHaveClass('hasTextBefore');
  });

  it('renders the correct class for both hasTextBefore and hasTextAfter', () => {
    render(<Icon name="foo" hasTextBefore={true} hasTextAfter={true} />);

    const icon = screen.getByTestId('icon');

    expect(icon).toHaveClass('hasTextBefore');
    expect(icon).toHaveClass('hasTextAfter');
  });

  it('does not render optional classes when not specified', () => {
    render(<Icon name="foo" hasTextBefore={false} hasTextAfter={false} />);

    const icon = screen.getByTestId('icon');

    expect(icon).not.toHaveClass('hasTextBefore');
    expect(icon).not.toHaveClass('hasTextAfter');
  });

  it('renders the given custom class name', () => {
    render(<Icon name="foo" className="custom" />);

    expect(screen.getByTestId('icon')).toHaveClass('custom');
  });
});
