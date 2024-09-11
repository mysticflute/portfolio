import Image from 'next/image';
import Box from '@/components/box/box';
import MediaBox from '@/components/mediaBox/mediaBox';
import IconButton from '@/components/iconButton/iconButton';
import composingImage from '@/public/images/illustrations/music-paper.svg';
import mixingImage from '@/public/images/illustrations/mixing.svg';
import recordingImage from '@/public/images/illustrations/instruments.svg';
import implementationImage from '@/public/images/illustrations/fmod-alt.svg';
import codingImage from '@/public/images/illustrations/code.svg';
import subscribeImage from '@/public/images/illustrations/subscribe.svg';
import styles from './myServices.module.css';

export default function MyServices() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h2 className="textHeadingMedium">
          My broad <span className="textHighlight2">set of services</span>
        </h2>
        <Box type="text">
          <p>
            Composing for games is my passion, but also just the start. I can
            help bring your game to life with dynamic implementation.
          </p>
        </Box>
      </div>

      <div className={styles.list}>
        <MediaBox
          heading="Composing"
          orientation="vertical"
          className={styles.box}
          image={<Image src={composingImage} alt="" />}
        >
          <p>
            Composing music for games, specializing in{' '}
            <strong>orchestral melodies</strong> and ambient soundscapes.
          </p>
        </MediaBox>
        <MediaBox
          heading="Mixing and mastering"
          orientation="vertical"
          className={styles.box}
          image={<Image src={mixingImage} alt="" />}
        >
          <p>
            Mixed and mastered audio tracks and stems, in any requested format.
          </p>
        </MediaBox>
        <MediaBox
          heading="Live recording"
          orientation="vertical"
          className={styles.box}
          image={<Image src={recordingImage} alt="" />}
        >
          <p>
            Live recording of orchestral <strong>flute</strong> and{' '}
            <strong>various winds</strong> from around the world, plus e-drums
            and hand perc.
          </p>
        </MediaBox>
        <MediaBox
          heading="Audio implementation"
          orientation="vertical"
          className={styles.box}
          image={<Image src={implementationImage} alt="" />}
        >
          <p>
            Integrating audio with tools including <strong>FMOD</strong> and{' '}
            <strong>Wwise</strong>, and full integration with game engines such
            as Unity.
          </p>
        </MediaBox>
        <MediaBox
          heading="Audio programming"
          orientation="vertical"
          className={styles.box}
          image={<Image src={codingImage} alt="" />}
        >
          <p>
            With over 11 years of professional coding experience, I&rsquo;m
            fluent in languages including Java, JavaScript, C# and GDScript.
          </p>
        </MediaBox>
        <Box className={styles.contact} type="raised">
          <Image src={subscribeImage} alt="" />
          <h3 className="textHeadingXSmall">Get in touch</h3>
          <p>
            Looking for another service? Get in touch with me, there is a high
            chance that I can help!
          </p>
          <IconButton type="primary" href="/contact" iconName="mail">
            Get in touch
          </IconButton>
        </Box>
      </div>
    </section>
  );
}
