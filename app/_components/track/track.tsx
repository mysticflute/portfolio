'use client';

import { useRef, useEffect } from 'react';
import { type ProjectMetadata } from '@/lib/projects';
import AudioPlayer from 'react-h5-audio-player';
import {
  useMediaContext,
  useMediaDispatch,
} from '@/components/mediaContext/mediaContext';
import 'react-h5-audio-player/lib/styles.css';
import styles from './track.module.css';

const envPreload = process.env.NEXT_PUBLIC_AUDIO_PRELOAD;
const defaultPreload =
  envPreload === 'auto' || envPreload === 'none' || envPreload === 'metadata'
    ? envPreload
    : 'metadata';

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

export default function Track({ track, isPlaying, onTrackEnd }: Props) {
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

  function handleTitleClick() {
    const ref = audioRef.current?.audio.current;
    if (ref) {
      if (ref.paused) {
        ref.play();
      } else {
        ref.pause();
      }
    }
  }

  function handlePlay() {
    if (context.currentTrackId !== track.id) {
      update({ type: 'playing', id: track.id });
    }
  }

  function handleEnded() {
    onTrackEnd && onTrackEnd(track.id);
  }

  return (
    <li className={styles.track}>
      <button
        title={track.name}
        className={styles.title}
        onClick={handleTitleClick}
      >
        {track.name}
      </button>
      <div className={styles.audio}>
        <AudioPlayer
          ref={audioRef}
          src={track.mp3 || track.aac}
          preload={defaultPreload}
          layout="horizontal"
          onPlay={handlePlay}
          onEnded={handleEnded}
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
        >
          {track.aac && <source src={track.aac} type="audio/aac" />}
          {track.mp3 && <source src={track.mp3} type="audio/mpeg" />}
          {track.mp3 && <a href={track.mp3}>Download the mp3 file here.</a>}
        </AudioPlayer>
      </div>
    </li>
  );
}
