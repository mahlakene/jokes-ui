import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Jokes from "./components/JokeReduce";
import { JokeProvider } from "./context/JokeProvider";
//import Timer from "./components/CountdownTimer";
//import { useState } from "react";

function App() {
  //const [jokeAmount, setJokeAmount] = useState(10);
  return (
    <JokeProvider>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* <div className="timer-block">
        <Timer initialTime={10} />
      </div> */}

      <div>
        <h1>Welcome to Jokes UI</h1>
        <Jokes />
      </div>
    </JokeProvider>
  );
}

export default App;
