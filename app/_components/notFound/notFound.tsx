import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/button/button';
import warningIcon from '@/public/images/icons/paperfolio/warning-large.svg';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusCode}>404</div>

        <div className={`${styles.topLayer} ${styles.warningIcon} flexCenter`}>
          <Image src={warningIcon} alt="Page error" priority />
        </div>

        <div className={styles.topLayer}>
          <hgroup className={styles.heading}>
            <p className="textHeadingLarge">Oops!</p>
            <h1 className="textHeadingMedium">Page Not Found</h1>
          </hgroup>
          <p className={styles.text}>
            That page is not here.
            <br />{' '}
            <span className={styles.textFade}>
              Perchance it has disappeared, into the ether.
            </span>
          </p>
          <div>
            <Button href="/" type="primary">
              Go to homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
