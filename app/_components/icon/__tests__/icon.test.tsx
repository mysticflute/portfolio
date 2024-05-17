import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Icon from '../icon';

describe('icon', () => {
  it('renders the correct class for the specified icon', () => {
    render(<Icon name="mail" decorative />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass('mail');
  });

  it('renders the correct class for hasTextBefore', () => {
    render(<Icon name="mail" decorative hasTextBefore />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'hasTextBefore',
    );
  });

  it('renders the correct class for hasTextAfter', () => {
    render(<Icon name="mail" decorative hasTextAfter />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'hasTextAfter',
    );
  });

  it('renders the correct class for both hasTextBefore and hasTextAfter', () => {
    render(<Icon name="mail" decorative hasTextBefore hasTextAfter />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'hasTextBefore',
      'hasTextAfter',
    );
  });

  it('does not render hasText classes when false', () => {
    render(
      <Icon
        name="mail"
        decorative
        hasTextBefore={false}
        hasTextAfter={false}
      />,
    );

    const icon = screen.getByRole('img', { hidden: true });

    expect(icon).not.toHaveClass('hasTextBefore', 'hasTextAfter');
  });

  it('renders the given custom class name', () => {
    render(<Icon name="mail" className="custom" decorative />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass('custom');
  });

  it('has aria-hidden=true when decorative', () => {
    render(<Icon name="mail" decorative />);

    expect(screen.getByRole('img', { hidden: true })).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('has does not have aria-hidden when not decorative', () => {
    render(<Icon name="mail" label="test-label" />);

    expect(screen.getByRole('img', { hidden: true })).not.toHaveAttribute(
      'aria-hidden',
    );
  });

  it('has aria-label when not decorative', () => {
    render(<Icon name="mail" label="test-label" />);

    expect(screen.getByRole('img', { name: 'test-label' })).toBeInTheDocument();
  });
});
