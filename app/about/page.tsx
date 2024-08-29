import { type Metadata } from 'next';
import Image from 'next/image';
import Layout from '@/components/layout/layout';
import Box from '@/components/box/box';
import IconButton from '@/components/iconButton/iconButton';
import HighlightList from '@/components/highlightList/highlightList';
import swordImage from '@/public/images/profile/profile-sword.jpg';
import teaImage from '@/public/images/profile/profile-tea.jpg';
import officeImage from '@/public/images/profile/office1.jpg';
import headshotImage from '@/public/images/profile/profile-headshot.jpg';
import tmpIcon from '@/public/images/icons/pulsar/about.svg';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Nathan David McWilliams.',
};

export default function AboutPage() {
  return (
    <Layout>
      <div className={`${styles.container} ${styles.intro}`}>
        <div className={styles.image}>
          <Image src={teaImage} alt="" />
        </div>
        <div className={styles.content}>
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
        <div className={styles.image}>
          <Image src={swordImage} alt="" />
        </div>
      </div>

      <div className={`${styles.container} ${styles.story}`}>
        <div>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight1">story</span> as a composer
          </h2>
          <Box type="raised" className={`${styles.image} ${styles.decorated}`}>
            <Image src={headshotImage} alt="Headshot of Nathan" />
          </Box>
        </div>

        <Box type="text" className={styles.text}>
          <p className={styles.dropCap}>
            My music journey began at a young age in my hometown of Seattle, WA.
            After a few years of watching my older brother play classics like
            Final Fantasy VI and Chrono Trigger, I finally got my hands on a few
            games of my own.
          </p>
          <p>
            Chrono Cross. Xenogears. Suikoden. I enjoyed these games immensely
            and was captivated by the music. I started teaching myself how to
            play songs from these games on the piano, learning works ranging
            from Decisive Battle and Terra&rsquo;s Theme to Arni Village.
          </p>
          <p>
            I&rsquo;ve been studying and composing music ever since for over 10
            years. I play the piano, drums, and multiple woodwind instruments.
          </p>
        </Box>
      </div>

      <div className={`${styles.storyInverse}`}>
        <div className={`${styles.container} ${styles.story}`}>
          <div>
            <h2 className="textHeadingMedium">
              My <span className="textHighlight4">experience</span>
            </h2>
            <p>
              I&rsquo;ve composed music for three commercial games under
              development, and I&rsquo;ve done commissions for streamers and
              content creators.
            </p>
            <p>
              I also have over 11 years of programming experience, and am
              well-versed in audio implementation using tools like FMOD.
            </p>

            <HighlightList className={styles.highlights}>
              <li>
                Composing, recording and mixing professionally for over 2 years.
              </li>
              <li>Audio implementation using FMOD and Wwise.</li>
              <li>Dynamic layering and custom sound design.</li>
            </HighlightList>

            <IconButton
              type="primary"
              inverse={true}
              href="/contact"
              iconName="mail"
            >
              Get in touch
            </IconButton>
          </div>
          <div>
            <Box type="flat" className={styles.image}>
              <Image src={officeImage} alt="Nathan's studio room" />
            </Box>
          </div>
        </div>
      </div>

      <div className={`${styles.container} ${styles.story}`}>
        <div>
          <h2 className="textHeadingMedium">
            The core values that drive my work
          </h2>
        </div>
        <Box type="text" className={styles.text}>
          <p>
            Contact me now to get started on your project, I can&rsquo;t wait to
            hear from you.
          </p>
        </Box>
      </div>

      <div className={`${styles.container} ${styles.cardGrid}`}>
        <Box type="flat" className={styles.valuesBox}>
          <div className={styles.imageWrap}>
            <Image src={tmpIcon} alt="" />
          </div>
          <div className={styles.contentWrap}>
            <h3 className="textHeadingSmall">Hard Work</h3>
            <p>
              Lacus adipiscing lectus convallis purus aliquet cursus magnaol
              dolori montes augue donec cras.
            </p>
          </div>
        </Box>
        <Box type="flat">
          <p>
            Contact me now to get started on your project, I can’t wait to hear
            from you.
          </p>
        </Box>
      </div>
    </Layout>
  );
}
