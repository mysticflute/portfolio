import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './nav.module.css';

import logo from '../../public/images/logo.svg';

const menu: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
];

export default function Nav() {
  const { asPath: currentPage } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <Link href="/" aria-label="home">
            <Image src={logo} alt="Site logo" className={styles.logo} />
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
          <Link href="/contact" className={styles.contact}>
            <span className="lineRoundedIcons"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
