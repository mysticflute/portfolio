/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Button from '../button';

describe('button', () => {
  it('renders the correct text', () => {
    render(<Button href="https://google.com">foo</Button>);

    expect(screen.getByRole('link')).toHaveTextContent('foo');
  });
});
