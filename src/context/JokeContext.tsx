import { createContext, useContext } from "react";
import { JokesAction, JokesState } from "./JokeProvider";

export function useJokeContext() {
  return useContext(JokeContext);
}

export type JokeContextProps = {
  state: JokesState;
  dispatch: React.Dispatch<JokesAction>;
};

export const JokeContext = createContext<JokeContextProps | null>(null);
