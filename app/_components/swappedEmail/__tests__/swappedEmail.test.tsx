import { beforeEach, afterEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {
  initializeObserverMocks,
  resetObserverMocks,
  setIsElementIntersecting,
  getObserversForElement,
} from '@/tests/lib/jest/intersectionObserver';
import SwappedEmail from '../swappedEmail';

const decodedEmail = 'real.human@test.com';
const encodedEmail = 'cmVhbC5odW1hbkB0ZXN0LmNvbQ==';
const spamEmail = 'spam@test.com';

describe('swappedEmail', () => {
  beforeEach(() => {
    initializeObserverMocks();
  });

  afterEach(() => {
    resetObserverMocks();
  });

  it('initially renders the spamEmail as the link href', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
      ></SwappedEmail>,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `mailto:${spamEmail}`,
    );
  });

  it('initially renders the spamEmail as the link text', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
      ></SwappedEmail>,
    );

    expect(screen.getByRole('link')).toHaveTextContent(spamEmail);
  });

  it('swaps the link href on intersection', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
      ></SwappedEmail>,
    );

    setIsElementIntersecting(screen.getByRole('link'), false);
    expect(screen.getByRole('link')).not.toHaveAttribute(
      'href',
      `mailto:${decodedEmail}`,
    );

    setIsElementIntersecting(screen.getByRole('link'), true);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `mailto:${decodedEmail}`,
    );
  });

  it('swaps the link text on intersection', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
      ></SwappedEmail>,
    );

    setIsElementIntersecting(screen.getByRole('link'), false);
    expect(screen.getByRole('link')).not.toHaveTextContent(decodedEmail);

    setIsElementIntersecting(screen.getByRole('link'), true);
    expect(screen.getByRole('link')).toHaveTextContent(decodedEmail);
  });

  it('calls disconnect on unmount', () => {
    const { unmount } = render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
      ></SwappedEmail>,
    );

    const link = screen.getByRole('link');
    const observer = getObserversForElement(link)[0];

    expect(observer.disconnect).toHaveBeenCalledTimes(0);

    unmount();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('calls the observer with the rootMargin option', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
        rootMargin="100px"
      ></SwappedEmail>,
    );

    const link = screen.getByRole('link');
    const observer = getObserversForElement(link)[0];

    expect(observer.rootMargin).toBe('100px');
  });

  it('renders icon when showIcon is true', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
        showIcon={true}
      ></SwappedEmail>,
    );

    expect(screen.queryByRole('presentation')).toBeInTheDocument();
  });

  it('does not render icon when showIcon is false', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
        showIcon={false}
      ></SwappedEmail>,
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('adds the custom link class name', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
        linkClassName="custom-link-class"
      ></SwappedEmail>,
    );

    expect(screen.getByRole('link')).toHaveClass('custom-link-class');
  });

  it('adds the custom icon class name', () => {
    render(
      <SwappedEmail
        spamEmail={spamEmail}
        encodedHumanEmail={encodedEmail}
        iconClassName="custom-icon-class"
      ></SwappedEmail>,
    );

    expect(screen.getByRole('presentation').closest('div')).toHaveClass(
      'custom-icon-class',
    );
  });
});
