'use client';

import { useId, useState, FormEvent } from 'react';
import Image from 'next/image';
import { logger } from '@/lib/logger';
import Box from '@/components/box/box';
import Icon from '@/components/icon/icon';
import subscribeImage from '@/public/images/illustrations/subscribe-large.svg';
import styles from './newsletter.module.css';

const endpoint = 'https://app.convertkit.com/forms';

export default function Newsletter() {
  const formId = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ID;
  if (!formId) {
    logger.error(
      'The environment variable NEXT_PUBLIC_NEWSLETTER_FORM_ID is not set. Newsletter registration will NOT be successful.',
    );
  }

  const id = useId();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${endpoint}/${formId}/subscriptions`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Unable to submit newsletter registration: ${response.status} `,
        );
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={subscribeImage} alt="" />
        </div>

        <Box type="flat" className={styles.box}>
          <span className={`${styles.text} textHeadingXSmall`}>
            Subscribe to my newsletter
          </span>

          <div className={styles.form}>
            {!isSuccess && !isError && (
              <form onSubmit={handleSubmit} aria-label="Newsletter sign-up">
                <div className={styles.formElement}>
                  <label htmlFor={`${id}-email`} className="assistiveText">
                    Email
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

                  <button disabled={isSubmitting} className={styles.submit}>
                    {isSubmitting ? 'Please wait...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            )}

            {isSuccess && (
              <div className={styles.success}>
                <Icon name="success" decorative className={styles.icon} />{' '}
                Thanks for joining! Check your email to confirm.
              </div>
            )}

            <div role="alert" className={styles.error}>
              {isError && (
                <>
                  <Icon name="error" decorative className={styles.icon} />{' '}
                  Something went wrong! Please try again later.
                </>
              )}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
