import React from "react";

function GridCounter({ size, handleIncrement, handleDecrement }) {
  return (
    <div className="size-input-container">
      <div className="counter">
        <button onClick={handleDecrement} disabled={size <= 2} className="counter-button">
          -
        </button>
        <span>{size}</span>
        <button onClick={handleIncrement} disabled={size >= 11} className="counter-button">
          +
        </button>
      </div>
    </div>
  );
}

export default GridCounter;