import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals';
import { render, act } from '@testing-library/react';
import {
  MediaContextProvider,
  useMediaContext,
} from '@/components/mediaContext/mediaContext';
import AudioTrack from '../audioTrack';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MediaContextProvider>{children}</MediaContextProvider>;
};

const trackMetadata = Object.freeze({
  id: 'LfFsucm-4g4PU5ZlfStxc',
  name: 'Track Name',
  mp3: 'https://test.mp3',
});

describe('audio track', () => {
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

  it('matches snapshot', () => {
    const { container } = render(<AudioTrack track={{ ...trackMetadata }} />, {
      wrapper: Providers,
    });

    expect(container).toMatchSnapshot();
  });

  it('audio plays when isPlaying is true', async () => {
    render(<AudioTrack track={{ ...trackMetadata }} isPlaying={true} />, {
      wrapper: Providers,
    });

    expect(isPausedMock).toBe(false);
    expect(playMock).toBeCalledTimes(1);
  });

  it('audio does not play when isPlaying is false', async () => {
    render(<AudioTrack track={{ ...trackMetadata }} isPlaying={false} />, {
      wrapper: Providers,
    });

    expect(isPausedMock).toBe(true);
    expect(playMock).not.toBeCalled();
  });

  it('does not call play on the audio if already playing', async () => {
    const { rerender } = render(
      <AudioTrack track={{ ...trackMetadata }} isPlaying={false} />,
      { wrapper: Providers },
    );

    playMock(); // fake click of the play button
    expect(playMock).toBeCalledTimes(1);

    rerender(<AudioTrack track={{ ...trackMetadata }} isPlaying={true} />);
    expect(playMock).toBeCalledTimes(1);
  });

  it('does not call pause on the audio if already paused', async () => {
    const { rerender } = render(
      <AudioTrack track={{ ...trackMetadata }} isPlaying={true} />,
      { wrapper: Providers },
    );

    pauseMock(); // fake click of the pause button
    expect(pauseMock).toBeCalledTimes(1);

    rerender(<AudioTrack track={{ ...trackMetadata }} isPlaying={false} />);
    expect(pauseMock).toBeCalledTimes(1);
  });

  it('calls onTrackEnd when the track ends', async () => {
    const onEnd = jest.fn();

    const { container } = render(
      <AudioTrack
        track={{ ...trackMetadata }}
        isPlaying={true}
        onTrackEnd={onEnd}
      />,
      { wrapper: Providers },
    );

    const audio = container.querySelector('audio');
    expect(audio).toBeDefined();
    expect(audio).toBeInTheDocument();

    act(() => {
      audio!.dispatchEvent(new Event('ended'));
    });

    expect(onEnd).toBeCalledWith(trackMetadata.id);
  });

  it('updates the track id in the context when the track plays', async () => {
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    const { container } = render(
      <>
        <ContextConsumer />
        <AudioTrack track={{ ...trackMetadata }} isPlaying={false} />
      </>,
      { wrapper: Providers },
    );

    const audio = container.querySelector('audio');
    expect(audio).toBeDefined();
    expect(audio).toBeInTheDocument();

    act(() => {
      audio!.dispatchEvent(new Event('play'));
    });

    expect(contextTrackId).toBe(trackMetadata.id);
  });
});
