import Image from 'next/image';
import twitchLogoImage from '@/public/images/logos/twitch.svg';
import projectImage from '@/public/images/projects/stencil-computer.svg';
import styles from './project.module.css';

export default function Project() {
  return (
    <article className={styles.project}>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.descriptionInner}>
            <div className={styles.tags}>
              <Image src={twitchLogoImage} alt="Twitch logo" />
              <div className={styles.badge}>Music Composer</div>
            </div>
            <h3 className="textHeadingSmall">
              Twitch user research and analysis
            </h3>
            <p>
              In ultricies viverra sed at hendrerit drogon nunc scelerisque nisl
              pellentesque et dignissim et aenean tempor adipiscing eget mi diam
              at tempus.
            </p>
          </div>
        </div>
        <div className={styles.image}>
          <Image src={projectImage} alt="Illustration for Recidivia" />
        </div>
      </div>
    </article>
  );
}
