import { useId } from 'react';
import Image from 'next/image';
import Box from '@/components/box/box';
import subscribeImage from '@/public/images/illustrations/subscribe-large.svg';
import styles from './newsletter.module.css';

export default function Newsletter() {
  const id = useId();

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={subscribeImage} alt="" />
        </div>
        <Box type="flat" className={styles.box}>
          <span className="textHeadingXSmall">Subscribe to my newsletter</span>
          <div className={styles.form}>
            <form
              action="https://app.convertkit.com/forms/7081942/subscriptions"
              method="post"
            >
              <label htmlFor={`${id}-email`} className="assistiveText">
                Email address
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email_address"
                  maxLength={256}
                  required
                  placeholder="Enter your email address"
                  className={styles.input}
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className={styles.submitButton}
                />
              </div>
            </form>
          </div>
        </Box>
      </div>
    </div>
  );
}
