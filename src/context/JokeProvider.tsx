import { ReactNode, useEffect, useReducer } from "react";
import { JokeData } from "../components/JokeReduce";
import { JokeContext } from "./JokeContext";

export type JokesState = {
  jokes: JokeData[];
  amount: number;
  loading: boolean;
  error?: string;
};

export type JokesAction = {
  type:
    | "JOKES_ADDED"
    | "JOKES_AMOUNT_CHANGED"
    | "JOKES_REMOVED"
    | "FETCH_INIT"
    | "FETCH_SUCCESS"
    | "FETCH_FAILURE";
  payload?: JokeData[] | number | string;
};

type JokeContextProviderProps = {
  children: ReactNode;
};

function jokesReducer(state: JokesState, action: JokesAction) {
  switch (action.type) {
    case "JOKES_ADDED":
      return {
        ...state,
        jokes: [...state.jokes, ...(action.payload as JokeData[])],
        loading: false,
      };
    case "JOKES_AMOUNT_CHANGED":
      return { ...state, amount: action.payload as number };
    case "JOKES_REMOVED":
      return { ...state };
    case "FETCH_INIT":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAILURE":
      console.log("fetch failure");
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
  }
}

export function JokeProvider({ children }: JokeContextProviderProps) {
  const initialState: JokesState = {
    jokes: [],
    amount: 0,
    loading: true,
    error: "",
  };
  const [state, dispatch] = useReducer(jokesReducer, initialState);

  useEffect(() => {
    if (state.amount > 0) {
      const fetchJokes = async () => {
        dispatch({ type: "FETCH_INIT" });
        const response = await fetch(
          `https://v2.jokeapi.dev/joke/Any?type=twopart&amount=${state.amount}`
        );
        console.log(response.status);
        if (!response.ok) {
          console.log("error");
          console.log(response.status);

          dispatch({ type: "FETCH_FAILURE", payload: response.status });
          return;
        }
        const data = await response.json();
        const jokes = Array.isArray(data.jokes) ? data.jokes : [data];
        dispatch({ type: "JOKES_ADDED", payload: jokes });
        dispatch({ type: "FETCH_SUCCESS" });
      };

      fetchJokes();
    }
  }, [state.amount]);

  return (
    <JokeContext.Provider value={{ state, dispatch }}>
      {children}
    </JokeContext.Provider>
  );
}
