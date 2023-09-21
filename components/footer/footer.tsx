import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

type SocialLinkWithIcon = SocialLink & { icon: ReactElement };

const socialLinksWithIcons: SocialLinkWithIcon[] = [
  { ...twitter, icon: <Image src={twitterIcon} alt="Twitter Icon" /> },
  { ...instagram, icon: <Image src={instagramIcon} alt="Instagram Icon" /> },
  { ...youtube, icon: <Image src={youtubeIcon} alt="YouTube Icon" /> },
  { ...soundcloud, icon: <Image src={soundcloudIcon} alt="SoundCloud Icon" /> },
  { ...linktree, icon: <Image src={linktreeIcon} alt="Linktree Icon" /> },
];

const linksPerColumn = 6;

export default function Footer() {
  const { asPath: currentPage } = useRouter();

  return (
    <footer role="contentinfo" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.grid}>
            <div className={`${styles.sectionWithText} ${styles.bio}`}>
              <Link href="/" className={styles.logo}>
                <Image src={logoImage} width={24} height={24} alt="Site logo" />
              </Link>
              <p>
                Acoustic and symphonic music for games and interactive media.
              </p>
              <ul className={styles.social}>
                {socialLinksWithIcons.map(link => (
                  <li key={link.key}>
                    <a
                      href={link.url}
                      className={styles.socialIcon}
                      data-key={link.key}
                    >
                      {link.icon}
                      <span className="assistiveText">
                        Nathan on {link.label}
                      </span>
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
                      aria-current={
                        page.path === currentPage ? 'page' : undefined
                      }
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.title}>Elsewhere</h2>
              <div className={styles.multiList}>
                <ul className={styles.list}>
                  {allSocialLinks.slice(0, linksPerColumn).map(social => (
                    <li key={social.label}>
                      <a key={social.label} href={social.url}>
                        {social.label}
                        <Icon name="arrowDiagonal" hasTextBefore={true} />
                      </a>
                    </li>
                  ))}
                </ul>
                {allSocialLinks.length > linksPerColumn && (
                  <ul className={styles.list}>
                    {allSocialLinks.slice(linksPerColumn).map(social => (
                      <li key={social.label}>
                        <a key={social.label} href={social.url}>
                          {social.label}
                          <Icon name="arrowDiagonal" hasTextBefore={true} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.contact}>
              <h2 className={styles.title}>Contact Me</h2>
              <ul className={styles.list}>
                <li>
                  <SwappedEmail
                    spamEmail={spamEmail}
                    encodedHumanEmail={encodedHumanEmail}
                    iconClassName={styles.socialIcon}
                    linkClassName={styles.hasIcon}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.bottom}>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <span className={styles.nowrap}>Nathan David McWilliams</span>
        </p>
      </div>
    </footer>
  );
}
