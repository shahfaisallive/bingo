import React from "react";
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
}) {
  return (
    <div className="button-container">
      <button
        className={
          isGridFilled ? "start-button-active" : "start-button-inactive"
        }
        onClick={!isGameStarted ? handleStartGame : handleRestartGame}
        disabled={!isGridFilled}
      >
        {!isGameStarted ? <FaPlay /> : <FaRedo />}
      </button>
      {!isGameStarted && (
        <button className="reset-button" onClick={handleReset}>
          <FaUndoAlt /> 
        </button>
      )}
      {!isGameStarted && (
        <button className="random-button" onClick={handleRandomFill}>
          <FaRandom /> 
        </button>
      )}
      {isGameStarted && (
        <button className="hide-button" onClick={toggleHideGame}>
          {isGameHidden ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}

export default GameButtons;
