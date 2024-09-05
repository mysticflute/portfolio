import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MyValues from '../myValues';

describe('myValues', () => {
  it('renders four boxes', () => {
    render(<MyValues />);

    expect(screen.getAllByRole('heading')).toHaveLength(4);
  });
});
