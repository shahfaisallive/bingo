import React from "react";
import './GameButtons.css'
import {
  FaPlay,
  FaRedo,
  FaRandom,
  FaEye,
  FaEyeSlash,
  FaUndoAlt,
} from "react-icons/fa";

function GameButtons({
  isGridFilled,
  isGameStarted,
  handleStartGame,
  handleRestartGame,
  handleReset,
  handleRandomFill,
  toggleHideGame,
  isGameHidden,
  fontFamily,
}) {
  return (
    <div className="button-container">
      <div className="button-wrapper">
        <button
          className={
            isGridFilled ? "start-button-active" : "start-button-inactive"
          }
          onClick={!isGameStarted ? handleStartGame : handleRestartGame}
          disabled={!isGridFilled}
        >
          {!isGameStarted ? <FaPlay /> : <FaRedo />}
        </button>
        <p className="button-text">
          {!isGameStarted ? "Start Game" : "Restart Game"}
        </p>
      </div>
      {!isGameStarted && (
        <div className="button-wrapper">
          <button className="reset-button" onClick={handleReset}>
            <FaUndoAlt />
          </button>
          <p className="button-text">Reset</p>
        </div>
      )}
      {!isGameStarted && (
        <div className="button-wrapper">
          <button className="random-button" onClick={handleRandomFill}>
            <FaRandom />
          </button>
          <p className="button-text">Random</p>
        </div>
      )}
      {isGameStarted && (
        <div className="button-wrapper">
          <button className="hide-button" onClick={toggleHideGame}>
            {isGameHidden ? <FaEyeSlash /> : <FaEye />}
          </button>
          <p className="button-text">
            {isGameHidden ? "Unhide Game" : "Hide Game"}
          </p>
        </div>
      )}
    </div>
  );
}

export default GameButtons;

