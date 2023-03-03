import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

  function toggleHamburger() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <Link href="/" aria-label="home" className={styles.logo}>
            <Image src={logo} alt="Site logo" />
          </Link>
        </div>

        <div className={styles.contentMiddle}>
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

        <div className={styles.contentRight}>
          <Link href="/contact" className={styles.contactButton}>
            <span className="lineRoundedIcons"></span>
          </Link>

          <div
            className={`${styles.hamburger} ${
              isMenuOpen ? styles.open : styles.closed
            }`}
            aria-label="menu"
            role="button"
            aria-controls="nav-overlay"
            aria-expanded="false"
            onClick={toggleHamburger}
          >
            <div className={styles.hamburgerTop}></div>
            <div className={styles.hamburgerBottom}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
