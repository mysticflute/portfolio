'use client';

import { ProjectMetadata } from '@/lib/projects';
import AudioPlayer from 'react-h5-audio-player';
import styles from './audioTrack.module.css';

import 'react-h5-audio-player/lib/styles.css';

type Props = {
  /**
   * TODO.
   */
  metadata: NonNullable<ProjectMetadata['tracks']>[number];
};

/**
 * Displays a Button component with an Icon to the left.
 */
export default function AudioTrack({ metadata }: Props) {
  return (
    <div className={styles.track}>
      <span className={styles.title}>{metadata.name}</span>
      <div className={styles.audio}>
        <AudioPlayer
          src={metadata.mp3}
          showJumpControls={false}
          layout="horizontal"
          preload="metadata"
          customVolumeControls={[]}
          customAdditionalControls={[]}
        />
      </div>
    </div>
  );
}
