import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainNav } from '@/components/nav/nav';
import Icon from '@/components/icon/icon';
import logoImage from '@/public/images/footer-logo-tmp.svg';
import twitterIcon from '@/public/images/icon-twitter.svg';
import instagramIcon from '@/public/images/icon-instagram.svg';
import youtubeIcon from '@/public/images/icon-youtube.svg';
import soundcloudIcon from '@/public/images/icon-soundcloud2.svg';
import linktreeIcon from '@/public/images/icon-linktree.svg';
import emailIcon from '@/public/images/icon-email.svg';
import styles from './footer.module.css';
import { ReactElement } from 'react';

// TODO: extract nav into lib

type SocialLink = {
  key: string;
  label: string;
  url: string;
  icon?: ReactElement;
};

/* later: bandcamp, spotify, apple music, patreon */
export const socialLinks: SocialLink[] = [
  {
    key: 'twitter',
    label: 'Twitter',
    url: 'https://twitter.com/mysticflute',
    icon: <Image src={twitterIcon} alt="Twitter Icon" />,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/mysticflute/',
    icon: <Image src={instagramIcon} alt="Instagram Icon" />,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@nathandavidmcwilliams',
    icon: <Image src={youtubeIcon} alt="YouTube Icon" />,
  },
  {
    key: 'soundcloud',
    label: 'SoundCloud',
    url: 'https://soundcloud.com/nathan_david_mcwilliams',
    icon: <Image src={soundcloudIcon} alt="SoundCloud Icon" />,
  },
  {
    key: 'linktree',
    label: 'Linktree',
    url: 'https://linktr.ee/nathanmcwilliams',
    icon: <Image src={linktreeIcon} alt="Linktree Icon" />,
  },
  {
    key: 'itch',
    label: 'Itch.io',
    url: 'https://mysticflute.itch.io/',
  },
  {
    key: 'mastodon',
    label: 'Mastodon',
    url: 'https://mastodon.gamedev.place/@mysticflute',
  },
];

export default function Footer() {
  const { asPath: currentPage } = useRouter();

  return (
    <footer role="contentinfo" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={`${styles.section} ${styles.main}`}>
            <Link href="/" className={styles.logoLink}>
              <Image src={logoImage} alt="Site logo" />
            </Link>
            <p className={styles.text}>
              Lorem ipsum dolor amet consecte adipiscing elit. Lectus mattis
              nunc.
            </p>
            <ul className={styles.social}>
              {socialLinks
                .filter(socialLink => !!socialLink.icon)
                .map(socialLink => (
                  <li key={socialLink.key}>
                    <a
                      href={socialLink.url}
                      className={styles.socialIcon}
                      data-key={socialLink.key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socialLink.icon}
                      {/* <span className="visually-hidden">Nathan on ${socialLink.label}</span> */}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.title}>Pages</div>
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

          <div className={styles.section}>
            <div className={styles.title}>Social</div>
            <div className={styles.multiList}>
              <ul className={styles.list}>
                {socialLinks.slice(0, 6).map(socialLink => (
                  <li key={socialLink.label}>
                    <a key={socialLink.label} href={socialLink.url}>
                      {socialLink.label}
                      <Icon name="arrowDiagonal" hasTextBefore={true} />
                    </a>
                  </li>
                ))}
              </ul>
              {socialLinks.length > 6 && (
                <ul className={styles.list}>
                  {socialLinks.slice(6).map(socialLink => (
                    <li key={socialLink.label}>
                      <a key={socialLink.label} href={socialLink.url}>
                        {socialLink.label}
                        <Icon name="arrowDiagonal" hasTextBefore={true} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.title}>Contact Me</div>
            <ul className={styles.list}>
              <li>
                <a className={styles.hasIcon} href="mailto:hello@ndm.studio">
                  <div className={styles.socialIcon}>
                    <Image src={emailIcon} alt="" />
                  </div>
                  hello@ndm.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.bottom}>
          Copyright &copy; {new Date().getFullYear()} Nathan David McWilliams
        </p>
      </div>
    </footer>
  );
}
