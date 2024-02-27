/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import ColorSchemeImage from '../colorSchemeImage';

const srcLight = {
  src: '/srcLight.png',
  height: 1,
  width: 1,
};

const srcDark = {
  src: '/srcDark.png',
  height: 1,
  width: 1,
};

describe('colorSchemeImage', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <ColorSchemeImage srcLight={srcLight} srcDark={srcDark} alt="alt text" />,
    );

    expect(container).toMatchSnapshot();
  });
});
