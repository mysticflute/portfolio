import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import {
  MediaContextProvider,
  useMediaContext,
} from '@/components/mediaContext/mediaContext';
import Playlist from '../playlist';

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
  let isPausedMock: boolean;
  let playMock: jest.Mock;
  let pauseMock: jest.Mock;

  beforeEach(() => {
    isPausedMock = true;

    playMock = jest.fn().mockImplementation(() => {
      isPausedMock = false;
    });

    pauseMock = jest.fn().mockImplementation(() => {
      isPausedMock = true;
    });

    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => {
        playMock();
      });

    jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {
        pauseMock();
      });

    jest
      .spyOn(window.HTMLMediaElement.prototype, 'paused', 'get')
      .mockImplementation(() => {
        return isPausedMock;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
        <Playlist tracks={[{ ...trackMetadataA }, { ...trackMetadataB }]} />,
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
        <Playlist tracks={[{ ...trackMetadataA }, { ...trackMetadataB }]} />,
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

  it('renders the specified class name', () => {
    render(<Playlist tracks={[{ ...trackMetadataA }]} className="custom" />, {
      wrapper: Providers,
    });

    expect(screen.getByRole('list')).toHaveClass('custom');
  });
});
