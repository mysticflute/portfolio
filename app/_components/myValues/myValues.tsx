import Image from 'next/image';
import MediaBox from '@/components/mediaBox/mediaBox';
import hardWorkImage from '@/public/images/illustrations/searching.svg';
import communicationImage from '@/public/images/illustrations/planning.svg';
import transparencyImage from '@/public/images/illustrations/receipt.svg';
import satisfactionImage from '@/public/images/illustrations/security.svg';
import styles from './myValues.module.css';

export default function MyValues() {
  return (
    <div className={`${styles.container} ${styles.values}`}>
      <MediaBox
        heading="Hard Work"
        image={<Image src={hardWorkImage} alt="" />}
      >
        <p>
          Relentlessly searching for and designing the best sounds that immerse
          players into the game.
        </p>
      </MediaBox>
      <MediaBox
        heading="Communication"
        image={<Image src={communicationImage} alt="" />}
      >
        <p>
          Sharing and iterating on ideas every step of the way, while adapting
          to feedback and changes.
        </p>
      </MediaBox>
      <MediaBox
        heading="Transparency"
        image={<Image src={transparencyImage} alt="" />}
      >
        <p>
          Upfront total pricing, so you know exactly what it&rsquo;s going to
          cost to get great audio for your game.
        </p>
      </MediaBox>
      <MediaBox
        heading="Satisfaction"
        image={<Image src={satisfactionImage} alt="" />}
      >
        <p>
          Unliimited revisions, working together until we get it just right.
        </p>
      </MediaBox>
    </div>
  );
}
