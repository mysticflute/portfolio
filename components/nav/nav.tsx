'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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

// TODO: remove null from currentItem once deleting the pages directory
function createNav(items: NavItems[], currentItem: string | null) {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.label}>
            <Link
              href={item.path}
              aria-current={item.path === currentItem ? 'page' : undefined}
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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.barLeft}>
          <Link href="/" aria-label="Home" className={styles.logo}>
            <Image
              src={logoImage}
              alt="Site logo"
              width={24}
              height={24}
              priority
            />
          </Link>
        </div>

        <div className={styles.barMiddle}>
          {createNav(mainNav, currentPath)}
        </div>

        <div className={styles.barRight}>
          <Link href="/contact" className={styles.contact}>
            <Icon name="mail" />
          </Link>

          <button
            aria-label="Menu"
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
        id="nav-overlay"
        className={clsx(styles.overlay, isOverlayOpen && styles.open)}
        onClick={() => setIsOverlayOpen(false)}
      >
        {createNav(mainNav, currentPath)}
      </div>
    </div>
  );
}
