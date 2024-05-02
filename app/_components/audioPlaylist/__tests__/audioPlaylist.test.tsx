import { describe, it, expect } from '@jest/globals';
import { render, act } from '@testing-library/react';
import {
  MediaContextProvider,
  useMediaContext,
} from '@/components/mediaContext/mediaContext';
import AudioPlaylist from '../audioPlaylist';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MediaContextProvider>{children}</MediaContextProvider>;
};

const trackMetadataA = Object.freeze({
  id: 'FoYRN5hkAVOhTcz3LsH7b',
  name: 'Track Name A',
  mp3: 'https://trackA.mp3',
});

const trackMetadataB = Object.freeze({
  id: 'ycov34wCwAFq7YvRwak96',
  name: 'Track Name B',
  mp3: 'https://trackB.mp3',
});

describe('audio playlist', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <AudioPlaylist tracks={[{ ...trackMetadataA }, { ...trackMetadataB }]} />,
      { wrapper: Providers },
    );

    expect(container).toMatchSnapshot();
  });

  it('plays the next track when a track ends', () => {
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    const { container } = render(
      <>
        <ContextConsumer />
        <AudioPlaylist
          tracks={[{ ...trackMetadataA }, { ...trackMetadataB }]}
        />
        ,
      </>,
      { wrapper: Providers },
    );

    const allAudio = container.querySelectorAll('audio');
    expect(allAudio).toHaveLength(2);

    const firstAudio = allAudio[0];
    expect(firstAudio).toBeDefined();
    expect(firstAudio).toBeInTheDocument();

    act(() => {
      firstAudio.dispatchEvent(new Event('play'));
    });

    expect(contextTrackId).toBe(trackMetadataA.id);

    act(() => {
      firstAudio.dispatchEvent(new Event('ended'));
    });

    expect(contextTrackId).toBe(trackMetadataB.id);
  });

  it('does not play another track when the last track ends', () => {
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    const { container } = render(
      <>
        <ContextConsumer />
        <AudioPlaylist
          tracks={[{ ...trackMetadataA }, { ...trackMetadataB }]}
        />
        ,
      </>,
      { wrapper: Providers },
    );

    const allAudio = container.querySelectorAll('audio');
    expect(allAudio).toHaveLength(2);

    const lastAudio = allAudio[1];
    expect(lastAudio).toBeDefined();
    expect(lastAudio).toBeInTheDocument();

    act(() => {
      lastAudio.dispatchEvent(new Event('play'));
    });

    expect(contextTrackId).toBe(trackMetadataB.id);

    act(() => {
      lastAudio.dispatchEvent(new Event('ended'));
    });

    expect(contextTrackId).toBe(trackMetadataB.id);
  });
});
