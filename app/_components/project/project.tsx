import { type CSSProperties, useId } from 'react';
import { type ProjectMetadata } from '@/lib/projects';
import Image from 'next/image';
import Box from '@/components/box/box';
import Icon from '@/components/icon/icon';
import Playlist from '@/components/playlist/playlist';
import styles from './project.module.css';

interface CustomProperties extends CSSProperties {
  '--color-project': string;
}

type Props = {
  /**
   * Metadata about a single portfolio project.
   */
  project: ProjectMetadata;
};

export default function Project({ project }: Props) {
  const id = useId();

  let inlineStyle: CustomProperties | undefined;
  if (project.color) {
    inlineStyle = { '--color-project': project.color };
  }

  return (
    <Box
      tag="article"
      className={styles.container}
      style={inlineStyle}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-description`}
    >
      <div className={styles.info}>
        {project.icon && (
          <Image
            src={`/images/icons/${project.icon}`}
            width="46"
            height="46"
            alt=""
          />
        )}
        <div className={styles.badge}>
          <span className="assistiveText">My role: </span>
          {project.role}
        </div>
      </div>

      <h3 className="textHeadingSmall" id={`${id}-heading`}>
        {project.name}
      </h3>

      <p id={`${id}-description`}>{project.description}</p>

      {project.tracks && (
        <Playlist tracks={project.tracks} className={styles.tracks} />
      )}

      {project.link && (
        <a href={project.link} className={styles.viewMore}>
          View project website
          <span className="assistiveText">for {project.name}</span>
          <Icon
            name="arrowDiagonal"
            decorative
            hasTextBefore
            className={styles.arrow}
          />
        </a>
      )}
    </Box>
  );
}
