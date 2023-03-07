import Link from 'next/link';
import Image from 'next/image';
import styles from './hero.module.css';
import profileImage from '../../public/images/profile.svg';

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <h1 className="text-heading-large">
            I&rsquo;m <span className={styles.headingHighlight1}>Nathan</span>,
            a Music Composer from{' '}
            <span className={styles.headingHighlight2}>Atlanta, GA</span>
          </h1>
          <p>
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p>
          <div className={styles.buttons}>
            <Link
              href="/contact"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              <span className="lineRoundedIcon linkIconLeft textMedium"></span>
              Get in touch
            </Link>
            <Link
              href="/portfolio"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              <span className="lineRoundedIcon linkIconLeft textMedium"></span>
              View portfolio
            </Link>
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
    </div>
  );
}
