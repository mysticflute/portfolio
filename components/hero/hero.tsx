import Image from 'next/image';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
import profileImage from '@/public/images/profile/profile.jpg';
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
            I write music for games and interactive media. I specialize in
            melodically-driven tracks, inspired by{' '}
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
            <Image
              src={profileImage}
              alt="Profile picture of Nathan David McWilliams"
              priority
            />
            {/* <img src="https://cdn.dribbble.com/userupload/2740488/file/original-60907ec0c68c5a2b008f4c3744120b1f.jpg?resize=2048x2048" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
