'use client';

import { clsx } from 'clsx';
import {
  useRef,
  useState,
  useEffect,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { type InternalLink } from '@/components/nav/links';
import Icon from '@/components/icon/icon';
import logoImage from '@/public/images/logo/letter-n.svg';
import styles from './nav.module.css';

type Props = {
  /**
   * The links to display.
   */
  links: InternalLink[];
};

export default function Nav({ links }: Props) {
  const currentPath = usePathname();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);

  // Close the overlay after a delay, giving time for the closing animation to
  // finish.
  useEffect(() => {
    let timeoutId: number;

    if (isOverlayClosing) {
      // the delay should match the animation time in CSS.
      timeoutId = window.setTimeout(() => setIsOverlayOpen(false), 300);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOverlayClosing]);

  // close the overlay when clicking outside of it.
  useEffect(() => {
    function handleClick(event: Event) {
      if (
        isOverlayOpen &&
        event.target instanceof Element &&
        !overlayRef.current?.contains(event.target) &&
        !overlayButtonRef.current?.contains(event.target)
      ) {
        closeOverlay();
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOverlayOpen]);

  function openOverlay() {
    setIsOverlayClosing(false);
    setIsOverlayOpen(true);
  }

  function closeOverlay() {
    setIsOverlayClosing(true);
  }

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    // close the overlay when clicking on a link inside of it.
    if (
      isOverlayOpen &&
      e.target instanceof Element &&
      e.target.tagName.toLowerCase() === 'a'
    ) {
      closeOverlay();
    }
  }

  function handleOverlayKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    // close the overlay when hitting escape key.
    if (isOverlayOpen && e.key === 'Escape') {
      closeOverlay();
      overlayButtonRef.current?.focus();
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.bar} flexCenter`}>
        <Link href="/" className={`${styles.logo} flexCenter`}>
          <Image
            src={logoImage}
            alt="Nathan David McWilliams"
            width={24}
            height={24}
            priority
          />
        </Link>

        <div className="flexCenter">
          {!isOverlayOpen && createNav(links, currentPath)}
        </div>

        <div className="flexCenter">
          <Link
            href="/contact"
            aria-label="Contact"
            aria-current={'/contact' === currentPath ? 'page' : undefined}
            className={styles.contactButton}
          >
            <Icon name="mail" />
          </Link>

          <button
            ref={overlayButtonRef}
            aria-label={`${isOverlayOpen ? 'Close' : 'Open'} main menu`}
            aria-haspopup="menu"
            aria-controls="nav-overlay"
            aria-expanded={isOverlayOpen}
            className={clsx(styles.hamburger, {
              [styles.open]: isOverlayOpen && !isOverlayClosing,
            })}
            onClick={() => (isOverlayOpen ? closeOverlay() : openOverlay())}
          >
            <div className={styles.hamburgerTop}></div>
            <div className={styles.hamburgerBottom}></div>
          </button>
        </div>
      </div>

      <div
        ref={overlayRef}
        id="nav-overlay"
        data-testid="nav-overlay"
        className={clsx(
          styles.overlay,
          isOverlayOpen && styles.open,
          isOverlayClosing && styles.closing,
        )}
        onClick={handleOverlayClick}
        onKeyUp={handleOverlayKeyUp}
      >
        {isOverlayOpen && createNav(links, currentPath)}
      </div>
    </div>
  );
}

function createNav(links: InternalLink[], current: string) {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={`${styles.list} flexCenter`}>
        {links.map(link => (
          <li key={link.key}>
            <Link
              href={link.path}
              aria-current={link.path === current ? 'page' : undefined}
              className="linkDefault"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
