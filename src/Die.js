import React from "react";

export default function Die(props) {
  let dots = [];
  for (let i = 0; i < props.number; i++) {
    dots.push(<span key={i} className="dot"></span>);
  }
  return (
    <button
      className={`die ${props.isLocked && "lockedDie"}`}
      onClick={props.lockToggle}
    >
      <h1 className="die-dots"> {dots}</h1>
    </button>
  );
}
