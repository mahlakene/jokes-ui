import { useEffect, useState } from "react";
import "./CountdownTimer.css";

type TimerProps = {
  initialTime: number;
};

export default function Timer({ initialTime }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        console.log(prevTime);
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer">
      <p>Time Remaining: {timeRemaining}</p>
    </div>
  );
}
