import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Box from '../box';

describe('box', () => {
  it('matches snapshot for default options', () => {
    const { container } = render(<Box>content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for type="text"', () => {
    const { container } = render(<Box type="text">content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for type="flat"', () => {
    const { container } = render(<Box type="flat">content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for type="hover"', () => {
    const { container } = render(<Box type="hover">content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for type="raised"', () => {
    const { container } = render(<Box type="raised">content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('renders the specified class name', () => {
    const { container } = render(<Box className="customclass">content...</Box>);

    expect(container).toMatchSnapshot();
  });

  it('renders the specified inline style', () => {
    const { container } = render(
      <Box style={{ color: 'red' }}>content...</Box>,
    );

    expect(container).toMatchSnapshot();
  });

  it('passes through aria-attributes', () => {
    const { container } = render(
      <Box type="flat" aria-labelledby="id1" aria-describedby="id2">
        content...
      </Box>,
    );

    expect(container).toMatchSnapshot();
  });

  it('uses the specified tag', () => {
    render(
      <Box type="hover" tag="article">
        content...
      </Box>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
