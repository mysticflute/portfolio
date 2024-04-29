import Image from 'next/image';
import Box from '@/components/box/box';
import Icon from '@/components/icon/icon';
import AudioPlaylist from '@/components/audioPlaylist/audioPlaylist';
import styles from './project.module.css';

import { type ProjectMetadata } from '@/lib/projects';

type Props = {
  /**
   * Metadata about a single portfolio project.
   */
  project: ProjectMetadata;
};

export default function Project({ project }: Props) {
  return (
    <Box tag="article" className={styles.container}>
      <div className={styles.info}>
        {project.icon && (
          <Image
            src={`/images/icons/${project.icon}`}
            width="46"
            height="46"
            alt=""
          />
        )}
        <div className={styles.badge}>{project.role}</div>
      </div>

      <h3 className="textHeadingSmall">{project.name}</h3>

      <p>{project.description}</p>

      {project.tracks && (
        <div className={styles.tracks} project-testid="tracks">
          <AudioPlaylist tracks={project.tracks} />
        </div>
      )}

      {project.link && (
        <div className={styles.viewMore}>
          <a href={project.link}>
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
