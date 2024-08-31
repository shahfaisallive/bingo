import React, { useState, useEffect } from "react";
import "./index.css";
import confetti from "canvas-confetti";

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

  useEffect(() => {
    if (score >= size) {
      launchConfetti(); 
    }
  }, [score, size]);

  const launchConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });

    confetti({
      particleCount: 200,
      spread: 200,
      origin: { y: 0.3 },
    });

    confetti({
      particleCount: 150,
      spread: 80,
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

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleRestartGame = () => {
    window.location.reload();
  };

  const handleReset = () => {
    setGrid(initialGrid(size));
    setIsGameStarted(false);
    setCurrentNumber(1);
    setError("");
    setScore(0);
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
      <div className="top-bar">
        <img src="/assets/logo.png" className="logo" alt="logo" />
        <div className="custom-tools">
          <div className="color-pickers">
            <input
              type="color"
              value={selectedColor}
              onChange={handleSelectedColorChange}
            />
            <input
              type="color"
              value={completedColor}
              onChange={handleCompletedColorChange}
            />
          </div>
          <div className="font-selector">
            <select value={fontFamily} onChange={handleFontChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Lobster">Lobster</option>
              <option value="Roboto">Roboto</option>
              <option value="Indie Flower">Indie Flower</option>
              <option value="Kalam">Kalam</option>
              <option value="Tillana">Tillana</option>
              <option value="Dancing Script">Dancing Script</option>
            </select>
          </div>
        </div>
      </div>
      {isGameStarted && (
        <div
          className="score-container"
          style={{ fontFamily: fontFamily, filter: isGameHidden ? "blur(10px)" : "none" }}
        >
          <h2>Score: {score}</h2>
        </div>
      )}
      {!isGameStarted ? (
        <div className="size-input-container">
          <div className="counter">
            <button onClick={handleDecrement} disabled={size <= 2}>
              <img
                src="/assets/minus.png"
                alt="minus"
                className="counter-icon"
              />
            </button>
            <span>{size}</span>
            <button onClick={handleIncrement} disabled={size >= 11}>
              <img src="/assets/add.png" alt="add" className="counter-icon" />
            </button>
          </div>
        </div>
      ) : null}
      <table
        className={
          isGameStarted && !isGameHidden ? "bingo-table-active" : "bingo-table"
        }
        style={{ filter: isGameHidden ? "blur(10px)" : "none" }}
      >
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`bingo-cell ${
                    cell.completed ? "completed" : ""
                  } ${cell.selected ? "selected" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    backgroundColor: cell.completed
                      ? completedColor
                      : cell.selected
                      ? selectedColor
                      : "#fff",
                    fontFamily: fontFamily,
                  }}
                >
                  <span className="cell-value">{cell.value}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
      <div className="button-container">
        <button
          className={
            isGridFilled ? "start-button-active" : "start-button-inactive"
          }
          onClick={!isGameStarted ? handleStartGame : handleRestartGame}
          disabled={!isGridFilled}
        >
          {isGameStarted ? "Restart Game" : "Start Game"}
        </button>
        {!isGameStarted && (
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        )}
        {!isGameStarted && (
          <button className="random-button" onClick={handleRandomFill}>
            Random
          </button>
        )}
        {isGameStarted && (
          <button className="hide-button" onClick={toggleHideGame}>
            {isGameHidden ? "Unhide Game" : "Hide Game"}
          </button>
        )}
      </div>

      <div className="footer">
        <p>
        Full Copyright Maal ©. Developed by{" "}
          <a
            href="https://github.com/shahfaisallive"
            target="_blank"
            rel="noreferrer"
          >
            apka bhai.
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
