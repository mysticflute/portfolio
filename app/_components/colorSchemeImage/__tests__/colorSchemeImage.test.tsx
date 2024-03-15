import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import ColorSchemeImage from '../colorSchemeImage';

const srcLight = {
  src: '/srcLight.png',
  width: 200,
  height: 100,
};

const srcDark = {
  src: '/srcDark.png',
  width: 200,
  height: 100,
};

describe('colorSchemeImage', () => {
  it('matches the snapshot with basic props', () => {
    const { container } = render(
      <ColorSchemeImage srcDark={srcDark} srcLight={srcLight} alt="alt text" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with additional props', () => {
    const { container } = render(
      <ColorSchemeImage
        srcDark={srcDark}
        srcLight={srcLight}
        alt="alt text"
        priority
        quality={80}
        sizes="(max-width: 500px) 100vw, 50vw"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
