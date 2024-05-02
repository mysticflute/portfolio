'use client';

import { createContext, useContext, useReducer, Dispatch } from 'react';

/**
 * Describes the media currently playing on the page.
 */
export type State = {
  /** The id of the current audio or video currently playing on the page. */
  currentTrackId: string | null;
};

/**
 * Describes a change to the media currently playing on the page.
 */
export type Action = { type: 'playing'; id: string };

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// handles dispatch calls
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'playing':
      return {
        ...state,
        currentTrackId: action.id,
      };
    default: {
      throw new Error(`MediaContext: unhandled action type "${action.type}"`);
    }
  }
}

/**
 * A React context provider for reading and providing info
 * about the currently playing media on the page.
 */
export function MediaContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentMedia, dispatch] = useReducer(reducer, {
    currentTrackId: null,
  });

  return (
    <StateContext.Provider value={currentMedia}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

/**
 * Gets the context for the currently playing media on the page.
 */
export function useMediaContext(): State {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useMediaContext must be used within MediaProvider');
  }
  return context;
}

/**
 * Gets the context to dispatch an update about the
 * currently playing media on the page.
 */
export function useMediaDispatch(): Dispatch<Action> {
  const dispatch = useContext(DispatchContext);
  if (dispatch === undefined) {
    throw new Error('useMediaDispatch must be used within MediaProvider');
  }
  return dispatch;
}
