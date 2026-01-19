import React, { useState, useEffect } from "react";
import "./OfflineGame.css";
import Score from "../shared/Score";
import GridCounter from "../shared/GridCounter";
import GridTable from "../shared/GridTable";
import GameButtons from "../shared/GameButtons";
import Lottie from "lottie-react";
import { initialGrid, launchConfetti, markCompletedSequences, calculateScore, checkPerfectBingo, handleRandomFill } from "../../../utils/gameUtils";
import { animations } from "../../../utils/animations";

function OfflineGame({
  fontFamily,
  selectedColor,
  completedColor,
  toggleHideGame,
  isGameHidden,
}) {
  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState(initialGrid(size));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [isPerfectBingo, setIsPerfectBingo] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [animationData, setAnimationData] = useState(animations[0]);

  useEffect(() => {
    if (score >= size) {
      const perfectBingo = checkPerfectBingo(grid);
      if (perfectBingo) {
        setIsPerfectBingo(true);
        launchConfetti(3);
      } else {
        launchConfetti(1);
      }

      setIsWinner(true);
      const randomIndex = Math.floor(Math.random() * animations.length);
      setAnimationData(animations[randomIndex]);
      setShowLottie(true);
    }
  }, [score, size, grid]);

  const handleSizeChange = (newSize) => {
    if (newSize > 1 && newSize < 12) {
      setSize(newSize);
      setGrid(initialGrid(newSize));
      setCurrentNumber(1);
      setIsGameStarted(false);
      setError("");
      setScore(0);
      setIsWinner(false);
      setIsPerfectBingo(false);
      setShowLottie(false);
    } else {
      setError("Grid size must be between 2 and 11");
    }
  };

  const handleIncrement = () => handleSizeChange(size + 1);
  const handleDecrement = () => handleSizeChange(size - 1);

  const handleCellClick = (row, col) => {
    if (!isGameStarted && currentNumber <= size * size) {
      if (!grid[row][col].value) {
        const newGrid = grid.map((r, i) =>
          r.map((cell, j) =>
            i === row && j === col ? { ...cell, value: currentNumber } : cell
          )
        );
        setGrid(newGrid);
        setCurrentNumber(currentNumber + 1);
        setError("");
      } else {
        setError("Cell is already filled. Choose another cell.");
      }
    } else if (isGameStarted) {
      const newGrid = grid.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? { ...cell, selected: !cell.selected } : cell
        )
      );
      const updatedGrid = markCompletedSequences(newGrid, size);
      setGrid(updatedGrid);
      setScore(calculateScore(updatedGrid, size));
    }
  };

  return (
    <div className="offline-game-wrapper">
      {isGameStarted && (
        <Score
          score={score}
          fontFamily={fontFamily}
          isGameHidden={isGameHidden}
          isWinner={isWinner}
          isPerfectBingo={isPerfectBingo}
        />
      )}
      {!isGameStarted && (
        <GridCounter
          size={size}
          gameMode={"offline"}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      )}
      <GridTable
        grid={grid}
        isGameStarted={isGameStarted}
        isGameHidden={isGameHidden}
        handleCellClick={handleCellClick}
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
      />
      {error && <div className="error-message">{error}</div>}
      <GameButtons
        isGridFilled={grid.flat().every((cell) => cell.value !== "")}
        isGameStarted={isGameStarted}
        handleStartGame={() => setIsGameStarted(true)}
        handleRestartGame={() => {
          setGrid(initialGrid(size));
          setIsGameStarted(false);
          setCurrentNumber(1);
          setError("");
          setScore(0);
          setIsWinner(false);
          setIsPerfectBingo(false);
          setShowLottie(false);
        }}
        handleReset={() => {
          setGrid(initialGrid(size));
          setIsGameStarted(false);
          setCurrentNumber(1);
          setError("");
          setScore(0);
          setIsWinner(false);
          setIsPerfectBingo(false);
          setShowLottie(false);
        }}
        handleRandomFill={() => handleRandomFill(size, setGrid, setCurrentNumber)}
        toggleHideGame={toggleHideGame}
        isGameHidden={isGameHidden}
        fontFamily={fontFamily}
      />

      {showLottie && (
        <div className="lottie-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}
    </div>
  );
}

export default OfflineGame;
