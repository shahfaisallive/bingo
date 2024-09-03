import React, { useState, useEffect } from "react";
import "./index.css";
import confetti from "canvas-confetti";
import TopBar from "./components/Topbar";
import Score from "./components/Score";
import GridCounter from "./components/GridCounter";
import GridTable from "./components/GridTable";
import GameButtons from "./components/GameButtons";
import Footer from "./components/Footer";
import Lottie from "lottie-react";

import celebration1 from "./animations/celebration1.json";
import celebration2 from "./animations/celebration2.json";
import celebration3 from "./animations/celebration3.json";
import celebration4 from "./animations/celebration4.json";
import celebration5 from "./animations/celebration5.json";

function App() {
  const initialGrid = (size) =>
    Array(size)
      .fill(null)
      .map(() =>
        Array(size).fill({ value: "", selected: false, completed: false })
      );

  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState(initialGrid(size));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#8551ca");
  const [completedColor, setCompletedColor] = useState("#1a7012");
  const [fontFamily, setFontFamily] = useState("Lobster");
  const [isGameHidden, setIsGameHidden] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isPerfectBingo, setIsPerfectBingo] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [animationData, setAnimationData] = useState(celebration1);

  // Array of animations
  const animations = [
    celebration1,
    celebration2,
    celebration3,
    celebration4,
    celebration5,
  ];

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

      // Set a random animation
      const randomIndex = Math.floor(Math.random() * animations.length);
      setAnimationData(animations[randomIndex]);

      setShowLottie(true);
    }
  }, [score, size, grid]);

  const launchConfetti = (multiple) => {
    confetti({
      particleCount: 200 * multiple,
      spread: 70 * multiple,
      origin: { y: 0.6 },
    });

    confetti({
      particleCount: 200 * multiple,
      spread: 200 * multiple,
      origin: { y: 0.3 },
    });

    confetti({
      particleCount: 150 * multiple,
      spread: 80 * multiple,
      origin: { y: 0.9 },
    });
  };

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

  const handleIncrement = () => {
    if (size < 11) {
      handleSizeChange(size + 1);
    }
  };

  const handleDecrement = () => {
    if (size > 2) {
      handleSizeChange(size - 1);
    }
  };

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
      const updatedGrid = markCompletedSequences(newGrid);
      setGrid(updatedGrid);
      setScore(calculateScore(updatedGrid));
    }
  };

  const markCompletedSequences = (grid) => {
    let updatedGrid = [...grid];

    // Check rows
    for (let i = 0; i < size; i++) {
      if (grid[i].every((cell) => cell.selected || cell.completed)) {
        updatedGrid = updatedGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === i ? { ...cell, completed: true } : cell
          )
        );
      }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
      if (grid.every((row) => row[i].selected || row[i].completed)) {
        updatedGrid = updatedGrid.map((row) =>
          row.map((cell, colIndex) =>
            colIndex === i ? { ...cell, completed: true } : cell
          )
        );
      }
    }

    // Check top-left to bottom-right diagonal
    if (grid.every((row, i) => row[i].selected || row[i].completed)) {
      updatedGrid = updatedGrid.map((row, i) =>
        row.map((cell, j) => (i === j ? { ...cell, completed: true } : cell))
      );
    }

    // Check top-right to bottom-left diagonal
    if (
      grid.every(
        (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
      )
    ) {
      updatedGrid = updatedGrid.map((row, i) =>
        row.map((cell, j) =>
          j === size - i - 1 ? { ...cell, completed: true } : cell
        )
      );
    }

    return updatedGrid;
  };

  const calculateScore = (grid) => {
    let score = 0;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (grid[i].every((cell) => cell.selected || cell.completed)) score++;
      if (grid.every((row) => row[i].selected || row[i].completed)) score++;
    }

    // Check diagonals
    if (grid.every((row, i) => row[i].selected || row[i].completed)) score++;
    if (
      grid.every(
        (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
      )
    )
      score++;

    return score;
  };

  const checkPerfectBingo = (grid) => {
    return grid.flat().every((cell) => !cell.selected || cell.completed);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleRestartGame = () => {
    setGrid(initialGrid(size));
    setIsGameStarted(false);
    setCurrentNumber(1);
    setError("");
    setScore(0);
    setIsWinner(false);
    setIsPerfectBingo(false);
    setShowLottie(false); // Hide the Lottie animation
  };

  const handleReset = () => {
    setGrid(initialGrid(size));
    setIsGameStarted(false);
    setCurrentNumber(1);
    setError("");
    setScore(0);
    setIsWinner(false);
    setIsPerfectBingo(false);
    setShowLottie(false); // Hide the Lottie animation
  };

  const handleSelectedColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleCompletedColorChange = (e) => {
    setCompletedColor(e.target.value);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const toggleHideGame = () => {
    setIsGameHidden(!isGameHidden);
  };

  const handleRandomFill = () => {
    const randomNumbers = Array.from({ length: size * size }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map((num, index) => ({
        value: num,
        selected: false,
        completed: false,
      }));

    const newGrid = [];
    for (let i = 0; i < size; i++) {
      newGrid.push(randomNumbers.slice(i * size, i * size + size));
    }

    setGrid(newGrid);
    setCurrentNumber(size * size + 1);
  };

  const isGridFilled = grid.flat().every((cell) => cell.value !== "");

  return (
    <div className="app">
      <TopBar
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
        handleSelectedColorChange={handleSelectedColorChange}
        handleCompletedColorChange={handleCompletedColorChange}
        handleFontChange={handleFontChange}
      />

      {isGameStarted && (
        <Score
          score={score}
          fontFamily={fontFamily}
          isGameHidden={isGameHidden}
          isWinner={isWinner}
          isPerfectBingo={isPerfectBingo}
        />
      )}
      {!isGameStarted ? (
        <GridCounter
          size={size}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      ) : null}
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
        isGridFilled={isGridFilled}
        isGameStarted={isGameStarted}
        handleStartGame={handleStartGame}
        handleRestartGame={handleRestartGame}
        handleReset={handleReset}
        handleRandomFill={handleRandomFill}
        toggleHideGame={toggleHideGame}
        isGameHidden={isGameHidden}
        fontFamily={fontFamily}
      />
      <Footer />

      {/* Lottie Animation */}
      {showLottie && (
        <div className="lottie-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}
    </div>
  );
}

export default App;
