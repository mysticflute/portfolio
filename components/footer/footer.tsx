import { useEffect, useState, useRef } from 'react';
import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainNav } from '@/components/nav/nav';
import Icon from '@/components/icon/icon';
import logoImage from '@/public/images/logo/letter-n.svg';
import twitterIcon from '@/public/images/icons/paperfolio/twitter.svg';
import instagramIcon from '@/public/images/icons/paperfolio/instagram.svg';
import youtubeIcon from '@/public/images/icons/paperfolio/youtube.svg';
import soundcloudIcon from '@/public/images/icons/custom/soundcloud.svg';
import linktreeIcon from '@/public/images/icons/pulsar/linktree.svg';
import emailIcon from '@/public/images/icons/paperfolio/email.svg';
import styles from './footer.module.css';

// encoded with Buffer.from('').toString('base64');
const encodedHumanEmail = 'bmF0aGFuQG5kbS5zdHVkaW8=';
const spamEmail = 'spam@ndm.studio';

// TODO: the double lists in Elsewhere don't wrap nicely on very narrow viewports.

type SocialLink = {
  key: string;
  label: string;
  url: string;
  icon?: ReactElement;
};

// later: bandcamp, spotify, apple music, patreon
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
    key: 'threads',
    label: 'Threads',
    url: 'https://www.threads.net/@mysticflute',
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

  const [emailAddress, setEmailAddress] = useState(spamEmail);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry], o) => {
          if (entry.isIntersecting) {
            setEmailAddress(window.atob(encodedHumanEmail));
            o.disconnect();
          }
        },
        { rootMargin: '250px' }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <footer role="contentinfo" className={styles.container} ref={ref}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.sectionWithText}>
            <Link href="/" className={styles.logo}>
              <Image src={logoImage} width={24} height={24} alt="Site logo" />
            </Link>
            <p>Acoustic and symphonic music for games and interactive media.</p>
            <ul className={styles.social}>
              {socialLinks
                .filter(socialLink => !!socialLink.icon)
                .map(socialLink => (
                  <li key={socialLink.key}>
                    <a
                      href={socialLink.url}
                      className={styles.socialIcon}
                      data-key={socialLink.key}
                    >
                      {socialLink.icon}
                      <span className="assistiveText">
                        Nathan on {socialLink.label}
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

          {/* TODO: get rid of this class */}
          <div className={styles.nowrap}>
            <h2 className={styles.title}>Elsewhere</h2>
            <ul className={styles.list}>
              {socialLinks.slice(0, 6).map(social => (
                <li key={social.label}>
                  <a key={social.label} href={social.url}>
                    {social.label}
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
              ))}
            </ul>
            {socialLinks.length > 6 && (
              <ul className={styles.list}>
                {socialLinks.slice(6).map(social => (
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

          <div>
            <h2 className={styles.title}>Contact Me</h2>
            <ul className={styles.list}>
              <li>
                <a
                  className={styles.hasIcon}
                  href={`mailto:${emailAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.socialIcon}>
                    <Image src={emailIcon} alt="" />
                  </div>
                  {emailAddress}
                </a>
              </li>
            </ul>
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
