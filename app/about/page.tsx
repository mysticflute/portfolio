import { type Metadata } from 'next';
import Layout from '@/components/layout/layout';
import Box from '@/components/box/box';
import IconButton from '@/components/iconButton/iconButton';
import styles from './page.module.css';
import Image from 'next/image';
import face1 from '@/public/images/profile/office3.png';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Nathan David McWilliams.',
};

export default function AboutPage() {
  return (
    <Layout>
      <div className={`${styles.container} ${styles.intro}`}>
        <h1 className="textHeadingLarge">
          Hello, I&rsquo;m <br />
          <span className="textHighlight2">Nathan</span>
        </h1>
        <Box type="text">
          <p>
            I write, produce and mix music for games and interactive media in my
            Atlanta, GA based studio.
          </p>
          <div className={`${styles.buttons} flexCenter`}>
            <IconButton type="primary" href="/contact" iconName="mail">
              Get in touch
            </IconButton>

            <IconButton type="secondary" href="#my-story" iconName="briefcase">
              My story
            </IconButton>
          </div>
        </Box>
      </div>

      <div className={`${styles.container} ${styles.story}`}>
        <div>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight1">story</span> as a composer
          </h2>
          <Box type="raised" className={styles.imgContainer}>
            <Image src={face1} alt="TODO" />
          </Box>
        </div>

        <Box type="flat" className={styles.content}>
          <p>
            My music journey began at a young age in my hometown of Seattle, WA.
          </p>
          <p>
            After a few years of watching my older brother play classics like
            Final Fantasy VI and Chrono Trigger, I finally got my hands on a few
            games of my own.
          </p>
          <p>
            Chrono Cross. Xenogears. Suikoden. I enjoyed these games immensely
            and was captivated by the music. Soon after I started teaching
            myself how to play songs from these games on the piano, learning
            works ranging from Decisive Battle and Terra’s Theme to Arni
            Village.
          </p>
          <p>
            After being gifted a Yamaha keyboard for Christmas I just had to
            start composing songs of my own.
          </p>
        </Box>
      </div>

      {/* <div className={`${styles.story} ${styles.storyInverse}`}>
        <div className={styles.container}>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight4">story</span> as a composer
          </h2>
          <div>
            <p>
              During high school I continued my piano lessons and picked up hand
              percussion from one of the best teachers I’ve ever had. I learned
              from him how to feel music, and not just play it. Later as an adult I
              started private flute lessons.
            </p>
            <p>
              Currently, my experience includes commission work for three
              commercial games under development, along with commissions from
              streamers and content creators. My professional work also includes
              programming and development, and I enjoy exploring systems for
              interactive and dynamic music implementations.
            </p>
            <p>
              When not writing music or gaming, I enjoy reading, traveling the
              world, hiking, learning Japanese, collecting various wind and
              percussion instruments, and, of course, drinking boba tea.
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className={styles.story}>
        <div className={styles.container}>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight3">story</span> going forward
          </h2>
          <Box type="hover">
            <p>
              There’s nothing else like a memorable melody flowing from your
              fingers, narrating or recalling moments from games that you’ll
              never forget. My compositions lean into the melodies, exploring
              where they can go, and my ambient tracks look to mirror the
              rhythmic and cyclic nature of the world around us.
            </p>
            <p>
              I want to do more than just write music that fits the project. I
              want to craft lasting experiences that will stick with players and
              viewers, bringing them back every now and then into that other
              world they experienced for a brief moment in their lives. Music is
              one part of the whole that brings such worlds to life, and there’s
              nothing like being part of a team to make that happen.
            </p>
            <p>
              Contact me now to get started on your project, I can’t wait to
              hear from you.
            </p>
          </Box>
        </div>
      </div> */}
    </Layout>
  );
}
