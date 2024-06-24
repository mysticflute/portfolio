import { type Metadata } from 'next';
import Layout from '@/components/layout/layout';
import { spamEmail, encodedHumanEmail } from '@/lib/constants';
import SwappedEmail from '@/components/swappedEmail/swappedEmail';
import Box from '@/components/box/box';
import styles from './page.module.css';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathan David McWilliams.',
};

export default function ContactPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className="textHeadingLarge">
          <span className="textHighlight2">Contact</span> me
        </h1>
        <Box type="text" className={styles.text}>
          <p>
            A contact form is coming soon. In the meantime, please send me an
            email at the address below. I&apos;ll be in touch shortly.
          </p>
        </Box>
        <Box type="flat" className={styles.card}>
          <SwappedEmail
            spamEmail={spamEmail}
            encodedHumanEmail={encodedHumanEmail}
            largeIcon={true}
            linkClassName="linkDefault flexCenter"
          />
        </Box>
      </div>
    </Layout>
  );
}
