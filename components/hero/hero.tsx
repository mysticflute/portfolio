import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
import ColorSchemeImage from '@/components/colorSchemeImage/colorSchemeImage';
import profileImageLight from '@/public/images/profile/profile-v2-high-q.png';
import profileImageDark from '@/public/images/profile/profile-high-q.jpg';
import styles from './hero.module.css';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <h1 id="about" className="textHeadingLarge">
            I&rsquo;m <span className="textHighlight1">Nathan</span>, a Composer
            in <span className="textHighlight2">Atlanta</span>
          </h1>
          {/* <p>
            Providing acoustic and symphonic music for video games and
            interactive media, inspired by JRPG classics.
          </p> */}
          <p>
            I write music for games and{' '}
            <span className={styles.extraDescription}>interactive</span> media.
            I specialize in melodically-driven tracks, inspired by{' '}
            <span className={styles.extraDescription}>JRPG</span> classics such
            as Final Fantasy, Suikoden and Octopath Traveler.
          </p>

          <div className={styles.buttons}>
            <Button type="primary" href="/contact">
              <Icon name="mail" hasTextAfter={true} />
              Get in touch
            </Button>

            <Button type="secondary" href="#portfolio">
              <Icon name="briefcase" hasTextAfter={true} />
              View portfolio
            </Button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.imageWrapper}>
            <ColorSchemeImage
              srcLight={profileImageLight}
              srcDark={profileImageDark}
              quality={80}
              placeholder="blur"
              fetchpriority="high"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 70vw, 50vw"
              alt="Character portrait of Nathan David McWilliams"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
