import Image from 'next/image';
import emailIcon from '@/public/images/icon/email-large.svg';
import styles from './contactInfo.module.css';

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="textHeadingLarge">
          <span className="textHighlight2">Contact</span> me
        </h1>
        <p>
          A contact form is coming soon. In the meantime, please send me an
          email at the address below. I&apos;ll be in touch shortly.
        </p>
        <div className={styles.card}>
          <a
            href="mailto:ndm.music.inbox@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={emailIcon} alt="" priority />
            ndm.music.inbox@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
