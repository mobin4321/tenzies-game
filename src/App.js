import React from "react";
import Die from "./Die";

function App() {
  const [numbers, setNumbers] = React.useState([]);
  const [locked, setLocked] = React.useState([]);
  const [win, setWin] = React.useState(false);
  const length = 8;

  function areAllElementsSame() {
    const firstElement = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== firstElement) {
        return false;
      }
    }
    return true;
  }

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

  React.useEffect(() => {
    roll();
  }, []);

  function roll() {
    if (win) {
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
    if (areAllElementsSame()) {
      setWin((prev) => !prev);
    }

    setLocked((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }
      return [...prev, index];
    });
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  return (
    <div className="container">
      <div className="window">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dies">{dies}</div>
        <h4 className={`won ${win && "wonVisible"}`}>YOU WON</h4>
        <button
          className={`roll-btn ${win === true && "resetGame"}`}
          onClick={roll}
        >
          {win ? "Reset Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
