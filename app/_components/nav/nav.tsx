'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { clsx } from 'clsx';
import Icon from '@/components/icon/icon';
import logoImage from '@/public/images/logo/letter-n.svg';
import styles from './nav.module.css';

type NavItems = {
  label: string;
  path: string;
};

export const mainNav: NavItems[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' },
  { label: 'Portfolio', path: '/#portfolio' },
  { label: 'Contact', path: '/contact' },
];

function createNav(items: NavItems[], currentItem: string) {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={`flexCenter ${styles.list}`}>
        {items.map(item => (
          <li key={item.label}>
            <Link
              href={item.path}
              aria-current={item.path === currentItem ? 'page' : undefined}
              className="linkDefault"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Nav() {
  const currentPath = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    function handleClick(e: globalThis.MouseEvent) {
      if (
        isOverlayOpen &&
        e.target instanceof Element &&
        !overlayRef.current?.contains(e.target)
      ) {
        setIsOverlayOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOverlayOpen, overlayRef]);

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target instanceof Element && e.target.tagName === 'A') {
      setIsOverlayOpen(false);
    }
  }

  function handleOverlayKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setIsOverlayOpen(false);
      overlayButtonRef.current?.focus();
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.bar} flexCenter`}>
        <Link
          href="/"
          aria-label="Home"
          className={`${styles.logo} flexCenter`}
        >
          <Image
            src={logoImage}
            alt="Site logo"
            width={24}
            height={24}
            priority
          />
        </Link>

        <div className="flexCenter" data-testid="nav-middle">
          {!isOverlayOpen && createNav(mainNav, currentPath)}
        </div>

        <div className="flexCenter">
          <Link
            href="/contact"
            aria-label="Contact"
            aria-current={'/contact' === currentPath ? 'page' : undefined}
            className={styles.contact}
          >
            <Icon name="mail" />
          </Link>

          <button
            ref={overlayButtonRef}
            aria-label={`${isOverlayOpen ? 'Close' : 'Open'} main menu`}
            aria-haspopup="menu"
            aria-controls="nav-overlay"
            aria-expanded={isOverlayOpen}
            className={clsx(styles.hamburger, isOverlayOpen && styles.open)}
            onClick={() => setIsOverlayOpen(isOpen => !isOpen)}
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
        className={clsx(styles.overlay, isOverlayOpen && styles.open)}
        onClick={handleOverlayClick}
        onKeyUp={handleOverlayKeyUp}
      >
        {isOverlayOpen && createNav(mainNav, currentPath)}
      </div>
    </div>
  );
}
