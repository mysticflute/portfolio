import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MyServices from '../myServices';

describe('myServices', () => {
  it('renders six boxes', () => {
    render(<MyServices />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6);
  });
});
