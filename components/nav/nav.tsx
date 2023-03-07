import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { clsx } from 'clsx';
import styles from './nav.module.css';
import logoImage from '../../public/images/logo.svg';

type NavItems = {
  label: string;
  path: string;
};

const mainNav: NavItems[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

function createNav(items: NavItems[], currentItem: string) {
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
  const { asPath: currentPage } = useRouter();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.barLeft}>
          <Link href="/" aria-label="Home" className={styles.logo}>
            <Image src={logoImage} alt="Site logo" priority />
          </Link>
        </div>

        <div className={styles.barMiddle}>
          {createNav(mainNav, currentPage)}
        </div>

        <div className={styles.barRight}>
          <Link href="/contact" className={styles.contact}>
            <span className="lineRoundedIcon"></span>
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
      >
        {createNav(mainNav, currentPage)}
      </div>
    </div>
  );
}
