import Image from 'next/image';
import Box from '@/components/box/box';
import IconButton from '@/components/iconButton/iconButton';
import HighlightList from '@/components/highlightList/highlightList';
import swordImage from '@/public/images/profile/profile-sword.jpg';
import teaImage from '@/public/images/profile/profile-tea.jpg';
import headshotImage from '@/public/images/profile/profile-headshot.jpg';
import studioImage from '@/public/images/studio/studio.jpg';
import styles from './myStory.module.css';

export default function MyStory() {
  return (
    <>
      <div className={styles.overflowHidden}>
        <div className={`${styles.container} ${styles.intro}`}>
          <div className={styles.image}>
            <Image src={teaImage} alt="" priority />
          </div>
          <div className={styles.content}>
            <h1 className="textHeadingLarge">
              Hey there, I&rsquo;m <br />
              <span className="textHighlight2">Nathan</span>
            </h1>
            <Box type="text">
              <p>
                I write, produce and mix music for games and interactive media
                in my Atlanta, GA based studio.
              </p>
              <div className={`${styles.buttons} flexCenter`}>
                <IconButton type="primary" href="/contact" iconName="mail">
                  Get in touch
                </IconButton>

                <IconButton type="secondary" href="#my-story" iconName="person">
                  My story
                </IconButton>
              </div>
            </Box>
          </div>
          <div className={styles.image}>
            <Image src={swordImage} alt="" priority />
          </div>
        </div>
      </div>

      <div
        className={`${styles.container} ${styles.story} ${styles.background}`}
      >
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
        <div
          className={`${styles.container} ${styles.story} ${styles.experience}`}
        >
          <div>
            <h2 className="textHeadingMedium">
              My <span className="textHighlight2">experience</span>
            </h2>
            <div className={styles.text}>
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
                  Composing and recording professionally for over 3 years.
                </li>
                <li>Audio implementation using FMOD and Wwise.</li>
                <li>Dynamic layering and custom sound design.</li>
              </HighlightList>
            </div>

            <IconButton
              type="primary"
              href="/contact"
              iconName="mail"
              inverse={true}
              className={styles.singleButton}
            >
              Get in touch
            </IconButton>
          </div>
          <div>
            <Box type="flat" className={styles.image}>
              <Image src={studioImage} alt="Nathan's studio room" />
            </Box>
          </div>
        </div>
      </div>

      <div className={`${styles.container} ${styles.story} ${styles.values}`}>
        <div>
          <h2 className="textHeadingMedium">
            The core values that drive my work
          </h2>
        </div>
        <Box type="text" className={styles.text}>
          <p>
            I want to craft lasting experiences that will stick with players and
            viewers. Music is one part of the whole that brings such worlds to
            life, and there&rsquo;s nothing like being part of a team to make
            that happen.
          </p>
          <p>
            Contact me now to get started on your project, I can&rsquo;t wait to
            hear from you.
          </p>
        </Box>
      </div>
    </>
  );
}
