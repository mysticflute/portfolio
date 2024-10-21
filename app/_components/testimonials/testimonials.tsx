import Image from 'next/image';
import Box from '@/components/box/box';
import Carousel from '../carousel/carousel';
import Testimonial from '../testimonial/testimonial';
import avatarWoman1 from '@/public/images/avatars/woman-2-square.png';
import avatarWoman2 from '@/public/images/avatars/woman-4-square.png';
import avatarMan1 from '@/public/images/avatars/man-1-square.png';
import styles from './testimonials.module.css';

export default function Testimonials() {
  const imageQuality = 80;
  const imageSizes = '(max-width: 991px) 100vw, 50vw';

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {/*prettier-ignore */}
        <h2 className="textHeadingMedium">
          What my clients say about <span className="textHighlight1">my work</span>
        </h2>
        <Box type="text">
          {/* <p>
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p> */}
          <p>
            Fantastic relationships are all about communication. If we can
            connect first as humans, we&rsquo;ll deliver our best work.
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
                image={
                  <Image
                    src={avatarWoman1}
                    alt="Illustration of a girl"
                    quality={imageQuality}
                    sizes={imageSizes}
                  />
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
          {
            id: 'testimonial-2',
            content: (
              <Testimonial
                name="Onemanarme"
                client="Recidivia, Video Game"
                image={
                  <Image
                    src={avatarMan1}
                    alt="Illustration of a boy"
                    quality={imageQuality}
                    sizes={imageSizes}
                  />
                }
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
                client="Custom Track, D&D Campaign"
                image={
                  <Image
                    src={avatarWoman2}
                    alt="Illustration of a girl"
                    quality={imageQuality}
                    sizes={imageSizes}
                  />
                }
              >
                Absolutely worth the wait. NDM did a superlative job. I&rsquo;m
                definitely going to be getting more music from them!
              </Testimonial>
            ),
          },
        ]}
      />
    </section>
  );
}
