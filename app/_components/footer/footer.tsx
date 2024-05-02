'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { spamEmail, encodedHumanEmail } from '@/lib/constants';
import { mainNav } from '@/components/nav/nav';
import Icon from '@/components/icon/icon';
import SwappedEmail from '@/components/swappedEmail/swappedEmail';
import logoImage from '@/public/images/logo/letter-n.svg';
import twitterIcon from '@/public/images/icons/paperfolio/twitter.svg';
import instagramIcon from '@/public/images/icons/paperfolio/instagram.svg';
import youtubeIcon from '@/public/images/icons/paperfolio/youtube.svg';
import soundcloudIcon from '@/public/images/icons/custom/soundcloud.svg';
import linktreeIcon from '@/public/images/icons/pulsar/linktree.svg';
import styles from './footer.module.css';
import {
  SocialLink,
  allSocialLinks,
  twitter,
  instagram,
  youtube,
  soundcloud,
  linktree,
} from '@/data/social';

type SocialLinkWithIcon = SocialLink & {
  icon: StaticImageData | typeof twitterIcon;
};

const socialLinksWithIcons: SocialLinkWithIcon[] = [
  { ...twitter, icon: twitterIcon },
  { ...instagram, icon: instagramIcon },
  { ...youtube, icon: youtubeIcon },
  { ...soundcloud, icon: soundcloudIcon },
  { ...linktree, icon: linktreeIcon },
];

export default function Footer() {
  const currentPath = usePathname();

  return (
    <footer role="contentinfo" className={styles.container}>
      <div className={`${styles.top} ${styles.grid}`}>
        <div className={`${styles.bioSection} ${styles.sectionWithText}`}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Home"
            data-testid="footer-logo-link"
          >
            <Image src={logoImage} width={24} height={24} alt="Site logo" />
          </Link>
          <p>Acoustic and symphonic music for games and interactive media.</p>
          <ul className={styles.socialIcons}>
            {socialLinksWithIcons.map(link => (
              <li key={link.key}>
                <a
                  href={link.url}
                  className={`${styles.socialIcon} flexCenter`}
                  data-key={link.key}
                >
                  <Image src={link.icon} alt={`Nathan on ${link.label}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.title}>Pages</h2>
          <ul className={styles.list}>
            {mainNav.map(page => (
              <li key={page.label}>
                <Link
                  href={page.path}
                  aria-current={page.path === currentPath ? 'page' : undefined}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.title}>Elsewhere</h2>
          <ul className={`${styles.list} ${styles.multiColumnList}`}>
            {allSocialLinks.map(link => (
              <li key={link.label}>
                <a key={link.label} href={link.url}>
                  {link.label}
                  <Icon name="arrowDiagonal" hasTextBefore={true} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h2 className={styles.title}>Contact Me</h2>
          <ul className={styles.list}>
            <li>
              <SwappedEmail
                spamEmail={spamEmail}
                encodedHumanEmail={encodedHumanEmail}
                iconClassName={`${styles.socialIcon} flexCenter`}
                linkClassName={styles.iconLink}
              />
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.bottom}>
        Copyright &copy; {new Date().getFullYear()}{' '}
        <span className={styles.nowrap}>Nathan David McWilliams</span>
      </p>
    </footer>
  );
}
