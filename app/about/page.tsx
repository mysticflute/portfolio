import { type Metadata } from 'next';
import Layout from '@/components/layout/layout';
import Box from '@/components/box/box';
import IconButton from '@/components/iconButton/iconButton';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Nathan David McWilliams.',
};

export default function AboutPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className="textHeadingLarge">
            Hello, I&rsquo;m <br />
            <span className="textHighlight2">Nathan</span>
          </h1>
          <Box type="text" className={styles.intro}>
            <p>
              I write music for games, film and interactive media, working out
              of my studio Atlanta, GA.
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

        <div className={styles.story}>
          <h2 className="textHeadingMedium" id="my-story">
            My <span className="textHighlight1">story</span> as a composer
          </h2>
          <Box type="raised">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do mod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              inim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p>
              Vestibulum rhoncus est pellentesque elit ullamcorper dignissim ras
              tincidunt. Diam vel quam elementum pulvinar etiam non quam lacus
              suspendisse. Condimentum mattis pellentesque id nibh tortor. Quis
              imperdiet massa tincidunt nunc. Ornare suspendisse sed nisi lacus
              sed viverra tellus. Volutpat lacus laoreet non curabitur gravida
              arcu ac tortor dignissim. Lectus arcu bibendum at varius vel
              pharetra.
            </p>
          </Box>
        </div>
      </div>
    </Layout>
  );
}
