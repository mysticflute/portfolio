import { useEffect } from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import {
  MediaContextProvider,
  useMediaContext,
  useMediaDispatch,
} from '../mediaContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MediaContextProvider>{children}</MediaContextProvider>;
};

describe('media context provider', () => {
  it('defaults to a null current track id', () => {
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    render(<ContextConsumer />, { wrapper: Providers });

    expect(contextTrackId).toBeNull();
  });

  it('updates the current track id when dispatch is called', () => {
    const testId = '64d866LtdteTA6nA_yWVD';
    let contextTrackId: string | null = null;

    const ContextConsumer = () => {
      const context = useMediaContext();
      contextTrackId = context.currentTrackId;
      return <></>;
    };

    const ContextUpdater = () => {
      const dispatch = useMediaDispatch();
      useEffect(() => {
        dispatch({ type: 'playing', id: testId });
      });
      return <></>;
    };

    render(
      <>
        <ContextConsumer />
        <ContextUpdater />
      </>,
      { wrapper: Providers },
    );

    expect(contextTrackId).toBe(testId);
  });
});
