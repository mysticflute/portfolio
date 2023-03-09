import Image from 'next/image';
import twitchLogoImage from '@/public/images/logos/twitch.svg';
import stencilComputer from '@/public/images/projects/stencil-computer.svg';
import styles from './project.module.css';

import { type ProjectMetadata } from '@/lib/projects';

type Props = {
  /**
   * Metadata about a single portfolio project.
   */
  projectMetadata: ProjectMetadata;
};

export default function Project({ projectMetadata: data }: Props) {
  return (
    <article className={styles.project}>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.descriptionInner}>
            <div className={styles.tags}>
              <Image src={twitchLogoImage} alt="Twitch logo" />
              <div className={styles.badge}>{data.role}</div>
            </div>
            <h3 className="textHeadingSmall">{data.name}</h3>
            <p>{data.description}</p>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src={data.image === 'stencil-computer.svg' && stencilComputer}
            alt={`Illustration for ${data.name}`}
          />
        </div>
      </div>
    </article>
  );
}
