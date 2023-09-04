import React from "react";

export default function Die(props) {
  return (
    <button
      className={`die ${props.isLocked && "lockedDie"}`}
      onClick={props.lockToggle}
    >
      <h1>{props.number}</h1>
    </button>
  );
}
