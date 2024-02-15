'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import emailIcon from '@/public/images/icons/paperfolio/email.svg';
// TODO optino for large email icon (contact page).

// Reference:
// https://css-tricks.com/how-to-safely-share-your-email-address-on-a-website

type Props = {
  /**
   * The initial email address to display in the html source code, i.e., what is
   * more likely to be read by spam bots and machines.
   */
  spamEmail: string;

  /**
   * The base64-encoded string of the email address for humans. This will
   * replace the initially rendered email address once this component is brought
   * into the viewport.
   *
   * It should look something like this: `Zm9vQGJhci5jb20=`.
   *
   * To base64-encode a string:
   * - Manually use `btoa` in your browser's console, for example:
   *   `btoa("foo@bar.com")`.
   * - Encode using node in the terminal, for example: `node -e
   *   "console.log(Buffer.from('foo@bar.com').toString('base64'))"`.
   * - Use an online tool such as https://www.base64encode.org.
   */
  encodedHumanEmail: string;

  /**
   * The `rootMargin` for the
   * [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
   *
   * This works like an offset for measuring when to perform the email swap,
   * relative to how far away it is from being scrolled into the viewport. For
   * example, a value of `"250px"` will trigger the email swap when this
   * component is 250px or closer from scrolling into the viewport. A value of
   * `"0px"` will wait until it's actually within the viewport.
   *
   * @defaultValue "250px".
   */
  rootMargin?: string;

  /**
   * Optional CSS class for the top-level link element.
   */
  linkClassName?: string;

  /**
   * Shows the email icon image when true.
   *
   * @defaultValue true.
   */
  showIcon?: boolean;

  /**
   * Optional CSS class for the icon image container element.
   */
  iconClassName?: string;
};

/**
 * Displays an initial email address in a mailto link, which gets swapped for
 * another address once this component is brought into the viewport.
 *
 * This enables using a decoy email address for spam bots and machines that
 * scrape the html source code. The real email address for humans isn't
 * displayed until this component is rendered and also within the viewport.
 *
 * This also means the real email address requires JavaScript to be running, so
 * using a one-off address for the `spamEmail` that can still be checked
 * periodically is useful.
 *
 * Ideally the `spamEmail` should have the same number of characters as the real
 * address to minimize layout shift.
 */
export default function SwappedEmail({
  spamEmail,
  encodedHumanEmail,
  rootMargin = '250px',
  linkClassName,
  showIcon = true,
  iconClassName,
}: Props) {
  const [emailAddress, setEmailAddress] = useState(spamEmail);
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry], o) => {
          if (entry.isIntersecting) {
            setEmailAddress(window.atob(encodedHumanEmail));
            o.disconnect();
          }
        },
        { rootMargin },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [encodedHumanEmail, rootMargin]);

  return (
    <a
      className={linkClassName}
      href={`mailto:${emailAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
    >
      {showIcon && (
        <div className={iconClassName}>
          <Image src={emailIcon} alt="" />
        </div>
      )}
      {emailAddress}
    </a>
  );
}
