import styles from './project.module.css';

import { type ProjectMetadata } from '@/lib/projects';

// TODO: handle the image sizes correctly.
/* eslint-disable @next/next/no-img-element */

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
              <img
                src={`/images/logos/${data.logoImage}`}
                alt="logo"
                loading="lazy"
              />

              <div className={styles.badge}>{data.role}</div>
            </div>
            <h3 className="textHeadingSmall">{data.name}</h3>
            <p>{data.description}</p>
          </div>
        </div>
        <div className={styles.image}>
          <img
            src={`/images/projects/${data.image}`}
            alt={`Illustration for ${data.name}`}
            width="642"
            height="605"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
