import { describe, expect, it, beforeEach, jest } from '@jest/globals';
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
  beforeEach(() => {
    // suppress React warning about fetchPriority prop until this is fixed:
    // https://github.com/facebook/react/issues/27233
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

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
        priority
        quality={80}
        alt="alt text"
        sizes="(max-width: 500px) 100vw, 50vw"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
