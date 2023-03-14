import { getUrlForTrack } from '@/lib/soundcloud';
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
    <article className={styles.container}>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.descriptionFlexInner}>
            <div className={styles.info}>
              {data.logoImage && (
                <img
                  src={`/images/logos/${data.logoImage}`}
                  alt="Client logo"
                  loading="lazy"
                />
              )}
              <div className={styles.badge}>{data.role}</div>
            </div>
            <h3 className="textHeadingSmall">{data.name}</h3>
            <p>{data.description}</p>
            <div className={styles.soundcloud}>
              {data.soundcloudIDs &&
                data.soundcloudIDs.map(id => (
                  <iframe
                    key={id}
                    width="100%"
                    height="20"
                    loading="lazy"
                    src={getUrlForTrack(id, { color: data.color })}
                  ></iframe>
                ))}
            </div>
          </div>
        </div>
        {/* style={{ backgroundColor: data.color }} */}
        <div className={styles.imageContainer}>
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
