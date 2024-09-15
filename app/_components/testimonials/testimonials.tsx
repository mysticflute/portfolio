import Image from 'next/image';
import Box from '@/components/box/box';
import quoteImage from '@/public/images/illustrations/quote.svg';
import avatarWoman1 from '@/public/images/illustrations/avatar_woman1.png';
import avatarWoman2 from '@/public/images/illustrations/avatar_woman2.png';
import avatarMan1 from '@/public/images/illustrations/avatar_man1.png';
import styles from './testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h2 className="textHeadingMedium">
          What my clients say about{' '}
          <span className="textHighlight1">my work</span>
        </h2>
        <Box type="text">
          <p>
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p>
        </Box>
      </div>
      <div className={styles.slides}>
        <div className={styles.slidesContent}>
          <Box type="flat" className={styles.slide}>
            <div className={styles.slideContent}>
              <div className={styles.quote}>
                <Image src={quoteImage} alt="" />
              </div>
              <div className={styles.info}>
                <p>
                  Nathan was great :&#x29; He was super professional and put a
                  lot more work and time into these songs than I expected.
                  It&rsquo;s also very important to him to make sure he has a
                  good understanding of the work the music is for in order to
                  make the best match.&#x201D;
                </p>
                <div className={styles.attribution}>
                  <div className={styles.name}>Lily Woods</div>
                  <div className={styles.client}>VP of Design at Google</div>
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  src={avatarWoman1}
                  alt="Avatar illustration of a woman"
                />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </section>
  );
}
