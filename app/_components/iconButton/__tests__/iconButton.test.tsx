import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
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
});
