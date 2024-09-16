import Image from 'next/image';
import Box from '@/components/box/box';
import quoteImage from '@/public/images/illustrations/quote.svg';
import styles from './testimonial.module.css';

export type Props = {
  /**
   * The person being quoted.
   */
  name: string;

  /**
   * The project or client the quote is about.
   */
  client: string;

  /**
   * An avatar image representing the person.
   */
  image: React.ReactNode;

  /**
   * The text of the testimonial.
   */
  children: React.ReactNode;
};

/**
 * A quote from a client about my work.
 */
export default function Testimonial({ name, client, image, children }: Props) {
  return (
    <Box type="flat" className={styles.testimonial}>
      <div className={styles.quotemark}>
        <Image src={quoteImage} alt="Opening quote mark" />
      </div>

      <div className={styles.content}>
        <p>{children}&#x201D;</p>
        <div className={styles.attribution}>
          <div className={styles.name}>{name}</div>
          <div className={styles.client}>{client}</div>
        </div>
      </div>
      <div className={styles.image}>{image}</div>
    </Box>
  );
}
