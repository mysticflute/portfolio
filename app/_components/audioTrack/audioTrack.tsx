'use client';

import { useRef } from 'react';
import { ProjectMetadata } from '@/lib/projects';
import AudioPlayer from 'react-h5-audio-player';
import styles from './audioTrack.module.css';
import {
  useMediaStatusDispatch,
  useMediaStatus,
} from '@/components/mediaContext/mediaContext';
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
  const audioRef = useRef<AudioPlayer>(null);
  const dispatch = useMediaStatusDispatch();
  const state = useMediaStatus();

  if (state.currentlyPlaying !== metadata.name) {
    const ref = audioRef.current?.audio.current;
    if (ref && !ref.paused) {
      ref.pause();
    }
  }

  const onPlay = () => {
    dispatch({ type: 'playing', id: metadata.name });
  };

  return (
    <div className={styles.track}>
      <span title={metadata.name} className={styles.title}>
        {metadata.name}
      </span>
      <div className={styles.audio}>
        <AudioPlayer
          // src={metadata.mp3}
          src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Jazz_at_Mladost_Club/Jazz_Night/Jazz_at_Mladost_Club_-_07_-_Blue_bossa.mp3"
          showJumpControls={false}
          layout="horizontal"
          preload="metadata"
          customVolumeControls={[]}
          customAdditionalControls={[]}
          onPlay={onPlay}
          ref={audioRef}
        />
      </div>
    </div>
  );
}
