import { type Metadata } from 'next';
import Image from 'next/image';
import Layout from '@/components/layout/layout';
import Box from '@/components/box/box';
import IconButton from '@/components/iconButton/iconButton';
import swordImage from '@/public/images/profile/profile-sword.jpg';
import teaImage from '@/public/images/profile/profile-tea.jpg';
import office from '@/public/images/profile/office3.png';
import face from '@/public/images/profile/face2.jpg';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Nathan David McWilliams.',
};

export default function AboutPage() {
  return (
    <Layout>
      <div className={`${styles.container} ${styles.intro}`}>
        <div className={styles.introImage}>
          <Image src={teaImage} alt="" />
        </div>
        <div className={styles.introContent}>
          <h1 className="textHeadingLarge">
            Hey there, I&rsquo;m <br />
            <span className="textHighlight2">Nathan</span>
          </h1>
          <Box type="text">
            <p>
              I write, produce and mix music for games and interactive media in
              my Atlanta, GA based studio.
            </p>
            <div className={`${styles.buttons} flexCenter`}>
              <IconButton type="primary" href="/contact" iconName="mail">
                Get in touch
              </IconButton>

              <IconButton
                type="secondary"
                href="#my-story"
                iconName="briefcase"
              >
                My story
              </IconButton>
            </div>
          </Box>
        </div>
        <div className={styles.introImage}>
          <Image src={swordImage} alt="" />
        </div>
      </div>

      <div className={`${styles.container} ${styles.story}`}>
        <div>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight1">story</span> as a composer
          </h2>
          <Box type="raised" className={styles.imgContainer}>
            <Image src={face} alt="TODO" className={styles.faceImg} />
          </Box>
        </div>

        <Box type="text" className={styles.content}>
          <p>
            My music journey began at a young age in my hometown of Seattle, WA.
            After a few years of watching my older brother play classics like
            Final Fantasy VI and Chrono Trigger, I finally got my hands on a few
            games of my own.
          </p>
          <p>
            Chrono Cross. Xenogears. Suikoden. I enjoyed these games immensely
            and was captivated by the music. Soon after I started teaching
            myself how to play songs from these games on the piano, learning
            works ranging from Decisive Battle and Terra&rsquo;s Theme to Arni
            Village.
          </p>
          <p>
            After getting a Yamaha keyboard for Christmas I just had to start
            composing songs of my own.
          </p>
        </Box>
      </div>

      <div className={`${styles.storyInverse}`}>
        <div className={`${styles.container} ${styles.story}`}>
          <div>
            <h2 className="textHeadingMedium">
              My <span className="textHighlight2">experience</span>
            </h2>
            <p>
              During high school I picked up hand percussion from one of the
              best teachers I&rsquo;ve ever had. I learned from him how to feel
              music, and not just play it. Later as an adult I started on
              various flutes.
            </p>
            <p>
              My experience includes work for three commercial games under
              development. I&rsquo;ve also done commissions from streamers and
              content creators. My work also includes programming and
              development, and I enjoy exploring systems for interactive and
              dynamic music implementations!
            </p>
            <p>
              When not writing music or gaming, I enjoy reading, traveling the
              world, hiking, learning Japanese, collecting various wind and
              percussion instruments, and drinking boba tea.
            </p>
          </div>
          <div>
            <Box type="raised" className={styles.imgContainer}>
              <Image src={office} alt="TODO" />
            </Box>
          </div>
        </div>
      </div>

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
