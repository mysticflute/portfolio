'use client';

import { type ProjectMetadata } from '@/lib/projects';
import AudioTrack from '@/components/audioTrack/audioTrack';
import {
  useMediaContext,
  useMediaDispatch,
} from '@/components/mediaContext/mediaContext';

type Props = {
  /**
   * The metadata for each track in the playlist.
   */
  tracks: NonNullable<ProjectMetadata['tracks']>;
};

export default function AudioPlaylist({ tracks }: Props) {
  const context = useMediaContext();
  const update = useMediaDispatch();

  const playNextTrack = function (id: string) {
    const currentIndex = tracks.findIndex(t => t.id === id);
    if (currentIndex === -1) {
      throw new Error(`Unable to find track id "${id}" within the playlist`);
    }

    const nextTrack =
      currentIndex < tracks.length ? tracks[currentIndex + 1] : null;

    if (nextTrack) {
      update({ type: 'playing', id: nextTrack.id });
    }
  };

  return (
    <>
      {tracks.map(track => (
        <AudioTrack
          key={track.id}
          track={track}
          isPlaying={context.currentTrackId === track.id}
          onTrackEnd={playNextTrack}
        />
      ))}
    </>
  );
}
