import Image from 'next/image';
import Box from '@/components/box/box';
import Carousel from '../carousel/carousel';
import Testimonial from '../testimonial/testimonial';
import avatar1 from '@/public/images/illustrations/avatar-tmp2.png';
import avatar2 from '@/public/images/illustrations/avatar-tmp.png';
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
        slides={[
          {
            id: 'testimonial-1',
            content: (
              <Testimonial
                name="Krystal-Ann Melbourne"
                client="Turning, Video Game"
                image={<Image src={avatar1} alt="Avatar illustration" />}
              >
                Nathan was great :&#x29; He was super professional and put a lot
                more work and time into these songs than I expected. It&rsquo;s
                also very important to him to make sure he has a good
                understanding of the work the music is for in order to make the
                best match.
              </Testimonial>
            ),
          },
          {
            id: 'testimonial-2',
            content: (
              <Testimonial
                name="Onemanarme"
                client="Recidivia, Video Game"
                image={<Image src={avatar2} alt="Avatar illustration" />}
              >
                Fantastic musician! Very pleased with the songs. I don&rsquo;t
                think any directions that I gave really mattered in the end
                because he had such incredible ideas of his own that he
                presented and I loved everything. Definitely will work with him
                again.
              </Testimonial>
            ),
          },
          {
            id: 'testimonial-3',
            content: (
              <Testimonial
                name="Nephi"
                client="D&D Campaign"
                image={<Image src={avatar1} alt="Avatar illustration" />}
              >
                Absolutely worth the wait. NDM did a superlative job. I'm
                definitely going to be getting more music from them!
              </Testimonial>
            ),
          },
        ]}
      ></Carousel>
    </section>
  );
}
