import React, { useState } from "react";
import "./index.css"; // Make sure to import the CSS file

function App() {
  const initialGrid = (size) =>
    Array(size)
      .fill(null)
      .map(() => Array(size).fill({ value: "", selected: false }));

  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState(initialGrid(size));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState("");

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 1 && newSize < 12) {
      setSize(newSize);
      setGrid(initialGrid(newSize));
      setCurrentNumber(1);
      setIsGameStarted(false);
      setError("");
    } else {
      setError("Grid size must be between 1 and 11");
    }
  };

  const handleCellClick = (row, col) => {
    if (!isGameStarted && currentNumber <= size * size) {
      // Check if the cell is already filled
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
      // Toggle cell selection after the game has started
      const newGrid = grid.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? { ...cell, selected: !cell.selected } : cell
        )
      );
      setGrid(newGrid);
    }
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
  };

  // Check if all cells are filled to enable the start button
  const isGridFilled = grid.flat().every((cell) => cell.value !== "");

  return (
    <div className="app">
      <h1 className="title">CHERRY BINGO</h1>
      {!isGameStarted ? (
        <div className="size-input-container">
          <label htmlFor="grid-size">Grid Size:</label>
          <input
            type="number"
            id="grid-size"
            value={size}
            onChange={handleSizeChange}
            min="1"
            disabled={isGameStarted} // Disable size change after game starts
          />
        </div>
      ) : null}
      <table className="bingo-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`bingo-cell ${cell.selected ? "selected" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
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
      </div>

      <div className="footer">
        <p>
          Made by{" "}
          <a href="github.com/shahfaisallive" target="_blank">
            shahfaisallive
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
