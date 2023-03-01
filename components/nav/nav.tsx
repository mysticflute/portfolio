// import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';

import logo from '../../public/images/logo.svg';

export default function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" aria-label="home">
            <Image src={logo} alt="Site logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.headerMiddle}>
          <nav role="navigation">
            <ul role="list" className="header-nav-menu-list">
              <li className="header-nav-list-item middle">
                <a
                  href="/home"
                  aria-current="page"
                  className="header-nav-link w-nav-link w--current"
                >
                  Home
                </a>
              </li>
              <li className="header-nav-list-item middle">
                <a href="/about" className="header-nav-link w-nav-link">
                  About
                </a>
              </li>
              <li className="header-nav-list-item middle">
                <a href="/portfolio" className="header-nav-link w-nav-link">
                  Portfolio
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.headerRight}></div>
      </div>
    </div>
  );
}
