import { spamEmail, encodedHumanEmail } from '@/lib/constants';
import SwappedEmail from '@/components/swappedEmail/swappedEmail';
import Box from '@/components/box/box';
import styles from './contactInfo.module.css';

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="textHeadingLarge">
          <span className="textHighlight2">Contact</span> me
        </h1>
        <Box type="text">
          <p>
            A contact form is coming soon. In the meantime, please send me an
            email at the address below. I&apos;ll be in touch shortly.
          </p>
        </Box>
        <div className={styles.card}>
          <SwappedEmail
            spamEmail={spamEmail}
            encodedHumanEmail={encodedHumanEmail}
            iconClassName={styles.socialIcon}
            linkClassName="linkDefault flexCenter"
          />
        </div>
      </div>
    </div>
  );
}
