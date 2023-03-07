import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { clsx } from 'clsx';

import styles from './nav.module.css';

import logo from '../../public/images/logo.svg';

const menu: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export default function Nav() {
  const { asPath: currentPage } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.barLeft}>
          <Link href="/" aria-label="home" className={styles.logo}>
            <Image src={logo} alt="Site logo" priority />
          </Link>
        </div>

        <div className={styles.barMiddle}>
          <nav role="navigation" aria-label="Main navigtion">
            <ul className={styles.list}>
              {menu.map(item => {
                const isCurrentPage = item.path === currentPage;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      aria-current={isCurrentPage ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className={styles.barRight}>
          <Link href="/contact" className={styles.contactButton}>
            <span className="lineRoundedIcons"></span>
          </Link>

          <div
            role="button"
            aria-label="menu"
            aria-haspopup="menu"
            aria-controls="nav-overlay"
            aria-expanded={isMenuOpen}
            className={clsx(styles.hamburger, isMenuOpen && styles.open)}
            onClick={() => setIsMenuOpen(isOpen => !isOpen)}
          >
            <div className={styles.hamburgerTop}></div>
            <div className={styles.hamburgerBottom}></div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.overlay, isMenuOpen && styles.open)}>
        {true && (
          <nav role="navigation" aria-label="Main navigtion">
            <ul className={styles.overlayList}>
              {menu.map(item => {
                const isCurrentPage = item.path === currentPage;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      aria-current={isCurrentPage ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
