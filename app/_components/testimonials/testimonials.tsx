import Image from 'next/image';
import Box from '@/components/box/box';
import Carousel from '../carousel/carousel';
import Testimonial from '../testimonial/testimonial';
import avatar1 from '@/public/images/illustrations/msketch2.png';
import styles from './testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {/*prettier-ignore */}
        <h2 className="textHeadingMedium">
          What my clients say about <span className="textHighlight1">my work</span>
        </h2>
        <Box type="text">
          <p>
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p>
        </Box>
      </div>

      <Carousel
        label="Testimonials"
        className={styles.carousel}
        items={[
          {
            id: 'testimonial-1',
            component: (
              <Testimonial
                name="Lily Woods"
                client="VP of Design at Google"
                image={
                  <Image src={avatar1} alt="Avatar illustration of a person" />
                }
              >
                Nathan was great :&#x29; He was super professional and put a lot
                more work and time into these songs than I expected. It&rsquo;s
                also very important to him to make sure he has a good
                understanding of the work the music is for in order to make the
                best match.
              </Testimonial>
            ),
          },
        ]}
      ></Carousel>
    </section>
  );
}
