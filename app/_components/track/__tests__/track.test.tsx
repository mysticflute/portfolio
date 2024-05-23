import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MediaContextProvider,
  useMediaContext,
} from '@/components/mediaContext/mediaContext';
import Track from '../track';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MediaContextProvider>{children}</MediaContextProvider>;
};

const trackMetadata = Object.freeze({
  id: 'LfFsucm-4g4PU5ZlfStxc',
  name: 'Track Name',
  mp3: 'https://test.mp3',
});

describe('track', () => {
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
        return Promise.resolve();
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
    const { container } = render(<Track track={{ ...trackMetadata }} />, {
      wrapper: Providers,
    });

    expect(container).toMatchSnapshot();
  });

  it('calls play() on audio element when isPlaying is true', () => {
    render(<Track track={{ ...trackMetadata }} isPlaying={true} />, {
      wrapper: Providers,
    });

    expect(isPausedMock).toBe(false);
    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it('does not call play() on audio element when isPlaying is false', () => {
    render(<Track track={{ ...trackMetadata }} isPlaying={false} />, {
      wrapper: Providers,
    });

    expect(isPausedMock).toBe(true);
    expect(playMock).not.toHaveBeenCalled();
  });

  it('does not call play() on audio element if already playing', () => {
    const { rerender } = render(
      <Track track={{ ...trackMetadata }} isPlaying={false} />,
      { wrapper: Providers },
    );

    playMock(); // fake click of the play button
    expect(playMock).toHaveBeenCalledTimes(1);

    rerender(<Track track={{ ...trackMetadata }} isPlaying={true} />);
    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it('does not call pause() on audio element if already paused', () => {
    const { rerender } = render(
      <Track track={{ ...trackMetadata }} isPlaying={true} />,
      { wrapper: Providers },
    );

    pauseMock(); // fake click of the pause button
    expect(pauseMock).toHaveBeenCalledTimes(1);

    rerender(<Track track={{ ...trackMetadata }} isPlaying={false} />);
    expect(pauseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onTrackEnd() when the track ends', () => {
    const onEnd = jest.fn();

    const { container } = render(
      <Track
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

    expect(onEnd).toHaveBeenCalledWith(trackMetadata.id);
  });

  it('dispatches a context update when the track starts playing', () => {
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    const { container } = render(
      <>
        <ContextConsumer />
        <Track track={{ ...trackMetadata }} isPlaying={false} />
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

  it('toggles between playing and paused when clicking on the title', async () => {
    const user = userEvent.setup();

    render(<Track track={{ ...trackMetadata }} isPlaying={false} />, {
      wrapper: Providers,
    });

    expect(isPausedMock).toBe(true);

    const title = screen.getByRole('button', { name: trackMetadata.name });

    await user.click(title);
    expect(isPausedMock).toBe(false);

    await user.click(title);
    expect(isPausedMock).toBe(true);

    expect(playMock).toHaveBeenCalledTimes(1);
  });
});
