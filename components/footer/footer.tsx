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

// TODO: extract nav into lib

// TODO put social links in a var (and optional icon property?)

export default function Footer() {
  const { asPath: currentPage } = useRouter();

  return (
    <footer role="contentinfo" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={`${styles.section} ${styles.main}`}>
            <Link href="/" className={styles.logoLink}>
              <Image src={logoImage} alt="Site logo and name" />
            </Link>
            <p>
              Lorem ipsum dolor amet consecte adipiscing elit. Lectus mattis
              nunc.
            </p>
            <div className={styles.social}>
              <a
                href="https://twitter.com/mysticflute"
                title="Twitter"
                className={`${styles.twitterIcon} ${styles.socialIcon}`}
              >
                <Image src={twitterIcon} alt="Twitter Icon" />
              </a>
              <a
                href="https://www.instagram.com/mysticflute/"
                title="Instagram"
                className={`${styles.instagramIcon} ${styles.socialIcon}`}
              >
                <Image src={instagramIcon} alt="Instagram Icon" />
              </a>
              <a
                href="https://www.youtube.com/@nathandavidmcwilliams"
                title="YouTube"
                className={`${styles.youtubeIcon} ${styles.socialIcon}`}
              >
                <Image src={youtubeIcon} alt="YouTube Icon" />
              </a>
              <a
                href="https://soundcloud.com/nathan_david_mcwilliams"
                title="SoundCloud"
                className={`${styles.soundcloudIcon} ${styles.socialIcon}`}
              >
                <Image src={soundcloudIcon} alt="SoundCloud Icon" />
              </a>
              <a
                href="https://linktr.ee/nathanmcwilliams"
                title="Linktree"
                className={`${styles.linktreeIcon} ${styles.socialIcon}`}
              >
                <Image src={linktreeIcon} alt="Linktree Icon" />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.footerTitle}>Pages</div>
            <ul className={styles.footerList}>
              {mainNav.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    aria-current={
                      item.path === currentPage ? 'page' : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.footerTitle}>Social</div>
            <div className={styles.multiList}>
              <ul className={styles.footerList}>
                <li>
                  <a href="https://twitter.com/mysticflute">
                    Twitter
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/mysticflute/">
                    Instagram
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@nathandavidmcwilliams">
                    YouTube
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                <li>
                  <a href="https://soundcloud.com/nathan_david_mcwilliams">
                    SoundCloud
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                <li>
                  <a href="https://linktr.ee/nathanmcwilliams">
                    Linktree
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                <li>
                  <a href="https://mysticflute.itch.io/">
                    Itch.io
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
                {/* later: bandcamp, spotify, apple music, patreon */}
              </ul>
              <ul className={styles.footerList}>
                <li>
                  <a href="https://mastodon.gamedev.place/@mysticflute">
                    Mastodon
                    <Icon name="arrowDiagonal" hasTextBefore={true} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.footerTitle}>Contact Me</div>
            <ul className={styles.footerList}>
              <li>
                <a
                  className={styles.footerLink}
                  href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%66%6F%6F%40%62%61%72%2E%63%6F%6D"
                >
                  <div className={styles.socialIcon}>
                    <Image src={emailIcon} alt="" />
                  </div>
                  hello [at] ndm.studio
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
