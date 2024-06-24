import IconButton from '@/components/iconButton/iconButton';
import ColorSchemeImage from '@/components/colorSchemeImage/colorSchemeImage';
import profileImageLight from '@/public/images/profile/profile-v2-high.png';
import profileImageDark from '@/public/images/profile/profile-high.jpg';
import styles from './hero.module.css';
import Box from '@/components/box/box';

export default function Hero() {
  return (
    <section className={styles.container}>
      <Box type="text" className={styles.intro}>
        <h1 id="about" className="textHeadingLarge">
          I&rsquo;m <span className="textHighlight1">Nathan</span>, <br /> a
          Composer in <span className="textHighlight2">Atlanta</span>
        </h1>
        <p>
          I write music for games and{' '}
          <span className={styles.extra}>interactive</span> media. I specialize
          in melodically-driven tracks, inspired by{' '}
          <span className={styles.extra}>JRPG</span> classics such as Final
          Fantasy, Suikoden and Octopath Traveler.
        </p>

        <div className={`${styles.buttons} flexCenter`}>
          <IconButton type="primary" href="/contact" iconName="mail">
            Get in touch
          </IconButton>

          <IconButton type="secondary" href="#portfolio" iconName="briefcase">
            View portfolio
          </IconButton>
        </div>
      </Box>
      <div className={styles.image} title="Art by @mechibaz.">
        <ColorSchemeImage
          priority
          quality={80}
          srcDark={profileImageDark}
          srcLight={profileImageLight}
          sizes="(max-width: 540px) calc(100vw-40px), (max-width: 767px) 500px, (max-width: 991px) 600px, (max-width: 1175px) 45vw, 500px"
          alt="Character portrait of Nathan David McWilliams"
        />
      </div>
    </section>
  );
}
