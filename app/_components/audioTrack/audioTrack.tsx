'use client';

import { useRef, useEffect } from 'react';
import { type ProjectMetadata } from '@/lib/projects';
import AudioPlayer from 'react-h5-audio-player';
import {
  useMediaContext,
  useMediaDispatch,
} from '@/components/mediaContext/mediaContext';
import 'react-h5-audio-player/lib/styles.css';
import styles from './audioTrack.module.css';

type Props = {
  /**
   * Metadata about the track.
   */
  track: NonNullable<ProjectMetadata['tracks']>[number];

  /**
   * Controls whether the <audio> element pauses or plays.
   */
  isPlaying?: boolean;

  /**
   * Function to call when a track finishes playing.
   * @param id The id of the track that finished playing.
   */
  onTrackEnd?(id: string): void;
};

export default function AudioTrack({ track, isPlaying, onTrackEnd }: Props) {
  const audioRef = useRef<AudioPlayer>(null);
  const context = useMediaContext();
  const update = useMediaDispatch();

  // sync the isPlaying prop with the audio element
  useEffect(() => {
    const ref = audioRef.current?.audio.current;
    if (ref) {
      if (isPlaying && ref.paused) {
        ref.play();
      } else if (!isPlaying && !ref.paused) {
        ref.pause();
      }
    }
  }, [isPlaying]);

  const onPlay = function () {
    if (context.currentTrackId !== track.id) {
      update({ type: 'playing', id: track.id });
    }
  };

  const onEnded = function () {
    onTrackEnd && onTrackEnd(track.id);
  };

  return (
    <div className={styles.track} data-testid="audio-track">
      <span title={track.name} className={styles.title}>
        {track.name}
      </span>
      <div className={styles.audio}>
        <AudioPlayer
          ref={audioRef}
          preload="metadata"
          layout="horizontal"
          // src={metadata.mp3}
          src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Jazz_at_Mladost_Club/Jazz_Night/Jazz_at_Mladost_Club_-_07_-_Blue_bossa.mp3"
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          onPlay={onPlay}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
}
