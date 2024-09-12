import { useId } from 'react';
import Image from 'next/image';
import Box from '@/components/box/box';
import subscribeImage from '@/public/images/illustrations/subscribe-large.svg';
import styles from './newsletter.module.css';

const formId = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ID;
if (!formId) {
  throw new Error(
    'The environment variable NEXT_PUBLIC_NEWSLETTER_FORM_ID is not set.',
  );
}

export default function Newsletter() {
  const id = useId();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={subscribeImage} alt="" />
        </div>

        <Box type="flat" className={styles.box}>
          <span className="textHeadingXSmall">Subscribe to my newsletter</span>
          <div className={styles.form}>
            <form
              method="post"
              action={`https://app.convertkit.com/forms/${formId}/subscriptions`}
            >
              <div className={styles.formElement}>
                <label htmlFor={`${id}-email`} className="assistiveText">
                  Email address
                </label>
                <input
                  type="email"
                  name="email_address"
                  id={`${id}-email`}
                  placeholder="Enter your email address"
                  required
                  maxLength={256}
                  className={styles.input}
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className={styles.submit}
                />
              </div>
            </form>
          </div>
        </Box>
      </div>
    </div>
  );
}
