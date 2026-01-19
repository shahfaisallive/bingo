import React from "react";
import './GridCounter.css'

function GridCounter({ size, handleIncrement, handleDecrement, gameMode }) {
  return (
    <div className="size-input-container">
      {gameMode === "offline" ? <div className="counter">
        <button onClick={handleDecrement} disabled={size <= 2} className="counter-button">
          -
        </button>
        <span>{size}</span>
        <button onClick={handleIncrement} disabled={size >= 11} className="counter-button">
          +
        </button>
      </div> : <div className="counter">
        <span>Grid Size: {size}</span>
      </div>}
    </div>
  );
}

export default GridCounter;