import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";

function App() {
  const [numbers, setNumbers] = React.useState([]);
  const [locked, setLocked] = React.useState([]);
  const [win, setWin] = React.useState(false);
  const maxTime = 30;
  let [timer, setTimer] = React.useState(maxTime);
  const [message, setMessage] = React.useState("YOU WON");
  const length = 8;
  const [bestTime, setBestTime] = React.useState();

  React.useEffect(() => {
    roll();
    localStorage.setItem("best", maxTime);
    setBestTime(maxTime);
  }, []);

  React.useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 || win) {
      clearInterval(intervalId);
    }
    if (timer === 0) {
      setMessage("Time Out!");
    }

    return () => clearInterval(intervalId);
  }, [new Date().getSeconds()]);

  const dies = numbers.map((number, index) => {
    return (
      <Die
        key={index}
        number={number}
        isLocked={locked.includes(index) ? true : false}
        lockToggle={() => lockToggle(index)}
      />
    );
  });

  function isWin() {
    const firstElement = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== firstElement) {
        return false;
      }
    }
    setWin(true);
    setMessage("YOU WON");
    console.log(win);
    maxTime - timer < localStorage.getItem("best") &&
      localStorage.setItem("best", maxTime - timer);
    setBestTime(localStorage.getItem("best"));
    return true;
  }

  function roll() {
    if (win) {
      setTimer(maxTime);
      resetGame();
      return;
    }
    setNumbers((prevNumbers) => {
      const arr = [...prevNumbers];
      for (let i = 0; i < length; i++) {
        if (locked.includes(i)) {
          continue;
        }
        arr[i] = getRandomNumber();
      }
      return arr;
    });
  }

  function resetGame() {
    setLocked([]);
    setWin(false);
    setNumbers((prevNumbers) => {
      const arr = [...prevNumbers];
      for (let i = 0; i < length; i++) {
        arr[i] = getRandomNumber();
      }
      return arr;
    });
  }

  function lockToggle(index) {
    setLocked((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }
      return [...prev, index];
    });
    isWin();
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  return (
    <div className="container">
      <div className="window">
        <h5 className="bestTime">{`Best Time : ${bestTime}s`}</h5>
        <h5 className="timer">{`Remaining Time : ${timer}s`}</h5>
        {win && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dies">{dies}</div>
        <h4 className={`won ${(win || timer === 0) && "wonVisible"}`}>
          {message}
        </h4>
        <button className={`roll-btn ${win && "resetGame"}`} onClick={roll}>
          {win || !timer ? "Reset Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
