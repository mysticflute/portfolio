import Image from 'next/image';
import Box from '@/components/box/box';
import Icon from '@/components/icon/icon';
import { getUrlForTrack } from '@/lib/soundcloud';
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
    <Box tag="article" className={styles.container}>
      <div className={styles.info}>
        {data.icon && (
          <Image
            src={`/images/icons/${data.icon}`}
            width="46"
            height="46"
            alt=""
          />
        )}
        <div className={styles.badge}>{data.role}</div>
      </div>
      <h3 className="textHeadingSmall">{data.name}</h3>
      <p>{data.description}</p>
      <div className={styles.soundcloud}>
        {data.soundCloudIds &&
          data.soundCloudIds.map(id => (
            <iframe
              key={id}
              width="100%"
              height="20"
              loading="lazy"
              src={getUrlForTrack(id, { color: data.color })}
              title={`Play music from ${data.name} with SoundCloud music player`}
            ></iframe>
          ))}
      </div>
      {data.link && (
        <div className={styles.viewMore}>
          <a href={data.link}>
            View project website
            <Icon
              name="arrowDiagonal"
              className={styles.arrow}
              hasTextBefore={true}
            />
          </a>
        </div>
      )}
    </Box>
  );
}
