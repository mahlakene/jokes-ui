import { useJokeContext, JokeContextProps } from "../context/JokeContext";
import "./Joke.css";

export type JokeData = {
  id: number;
  category: string;
  type: string;
  setup: string;
  delivery: string;
};

function Joke({ item }: { item: JokeData }) {
  return (
    <li key={item.id} className="joke">
      <h3>Category: {item.category}</h3>
      <p className="setup">{item.setup}</p>
      <p className="delivery">{item.delivery}</p>
    </li>
  );
}

export default function JokeList() {
  const { state, dispatch } = useJokeContext() as JokeContextProps;

  return (
    <div>
      <h2>Jokes List</h2>
      <input
        type="number"
        value={state.amount}
        onChange={(e) =>
          dispatch({
            type: "JOKES_AMOUNT_CHANGED",
            payload: Number(e.target.value),
          })
        }
      />
      <button
        onClick={() => {
          dispatch({ type: "JOKES_REMOVED" });
        }}
      >
        Remove jokes
      </button>

      {state.loading ? (
        <p>Loading..</p>
      ) : state.error?.length !== 0 ? (
        <img src={`https://http.cat/${state.error}]`}></img>
      ) : (
        <ul>
          {state.jokes.map((joke, index) => (
            <Joke key={index} item={joke} />
          ))}
        </ul>
      )}
    </div>
  );
}
