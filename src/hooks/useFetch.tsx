import { useState, useEffect } from "react";
import { JokeData } from "../components/Joke";

type JokesResponse = {
  jokes: JokeData[];
};

const useFetch = (url: string) => {
  const [data, setData] = useState<JokesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
