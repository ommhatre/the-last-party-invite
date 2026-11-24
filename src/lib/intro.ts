import { createContext, useContext } from 'react';

export interface IntroContextValue {
  /** True once the visitor has entered the court at least once. Section animations wait for this. */
  entered: boolean;
  replayIntro: () => void;
}

export const IntroContext = createContext<IntroContextValue>({
  entered: false,
  replayIntro: () => {},
});

export const useIntro = () => useContext(IntroContext);
