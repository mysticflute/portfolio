import Image from 'next/image';
import Box from '@/components/box/box';
import Icon from '@/components/icon/icon';
import AudioTrack from '@/components/audioTrack/audioTrack';
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

      {data.tracks &&
        data.tracks.map(track => (
          // <audio key={track.name} controls preload="none">
          //   {track.aac && <source src={track.aac} type="audio/aac" />}
          //   {track.mp3 && <source src={track.mp3} type="audio/mpeg" />}
          //   Your browser does not support the audio element.
          // </audio>
          <AudioTrack key={track.name} metadata={track} />
        ))}

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
