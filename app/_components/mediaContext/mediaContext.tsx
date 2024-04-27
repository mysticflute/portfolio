'use client';

import { createContext, useContext, useReducer, Dispatch } from 'react';

type State = {
  currentlyPlaying: string | null;
};

type Action = { type: 'playing'; id: string };

const defaultState: State = {
  currentlyPlaying: null,
};

const MediaStatusContext = createContext<State | undefined>(undefined);
const MediaStatusDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined,
);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'playing':
      return {
        ...state,
        currentlyPlaying: action.id,
      };
    default: {
      throw new Error(`MediaContext: unhandled action type "${action.type}:"`);
    }
  }
}

export function useMediaStatus(): State {
  const context = useContext(MediaStatusContext);
  if (context === undefined) {
    throw new Error('useMediaStatus must be used within a MediaProvider');
  }
  return context;
}

export function useMediaStatusDispatch(): Dispatch<Action> {
  const dispatch = useContext(MediaStatusDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      'useMediaStatusDispatch must be used within a MediaProvider',
    );
  }
  return dispatch;
}

export function MediaStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentMedia, dispatch] = useReducer(reducer, defaultState);

  return (
    <MediaStatusContext.Provider value={currentMedia}>
      <MediaStatusDispatchContext.Provider value={dispatch}>
        {children}
      </MediaStatusDispatchContext.Provider>
    </MediaStatusContext.Provider>
  );
}
