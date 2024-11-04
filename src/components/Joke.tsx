import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Joke.css";

export type JokeData = {
  category: string;
  type: string;
  setup: string;
  delivery: string;
};

type JokesProps = {
  amount: number;
};

export default function Jokes({ amount }: JokesProps) {
  const [jokes, setJokes] = useState<JokeData[]>([]);

  const { data, loading, error } = useFetch(
    `https://v2.jokeapi.dev/joke/Any?type=twopart&amount=${amount}`
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.jokes)) {
        setJokes(data.jokes);
      } else if (amount === 1) {
        setJokes([data.jokes]);
      } else {
        setJokes([]);
      }
    }
  }, [data, amount]);

  return (
    <div>
      <h2>Jokes List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{String(error)}</p>
      ) : jokes.length > 0 ? (
        <ul>
          {jokes.map((joke, index) => (
            <li key={index} className="joke">
              <h3>Category: {joke.category}</h3>
              <p className="setup">{joke.setup}</p>
              <p className="delivery">{joke.delivery}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jokes available.</p>
      )}
    </div>
  );
}
// const jokeData: JokeData = {
//   category: "Christmas",
//   type: "twopart",
//   setup: "Why did Santa's helper see the doctor?",
//   delivery: 'Because he had a low "elf" esteem!',
// };

// const [showPunchline, setShowPunchline] = useState(false);
// const handleClick = () => {
//   setShowPunchline((prev) => !prev);
// };

// return (
//   <div className="joke">
//     <h3>Joke Category: {jokeData.category}</h3>
//     <p className="setup">{jokeData.setup}</p>
//     {showPunchline && <p className="delivery">{jokeData.delivery}</p>}
//     <button onClick={handleClick}>
//       {showPunchline ? "Hide Punchline" : "Tell me!"}
//     </button>
//   </div>
// );
