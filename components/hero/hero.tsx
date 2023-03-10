import Image from 'next/image';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
// XXX: for testing, remove (and the lorem ipsum text below)
// import profileImage from '@/public/images/profile.svg';
import profileImage from '@/public/images/profile2.jpg';
import styles from './hero.module.css';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.intro}>
          {/* prettier-ignore */}
          <h1 id="about" className="textHeadingLarge">
            I&rsquo;m <span className="textHighlight1" title="Because Nathan David McWilliams is too long to fit here!">
              Nathan
            </span>, a Music Composer from <span className="textHighlight2">Atlanta, GA</span>
          </h1>
          {/* <p>
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p> */}
          <p>
            I write music for games and interactive media. I specialize in
            melodically-driven acoustic and symphonic music, inspired by JRPG
            classics such as Final Fantasy, Suikoden and Octopath Traveler.
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
          </div>
        </div>
      </div>
    </section>
  );
}
