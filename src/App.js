
// import React, { useState, useEffect } from "react";
// import "./index.css"; // Make sure to import the CSS file

// function App() {
//   const initialGrid = (size) =>
//     Array(size)
//       .fill(null)
//       .map(() =>
//         Array(size).fill({ value: "", selected: false, completed: false })
//       );

//   const [size, setSize] = useState(5);
//   const [grid, setGrid] = useState(initialGrid(size));
//   const [isGameStarted, setIsGameStarted] = useState(false);
//   const [currentNumber, setCurrentNumber] = useState(1);
//   const [error, setError] = useState("");
//   const [score, setScore] = useState(0);
//   const [isWinner, setIsWinner] = useState(false); // New state to track the winner

//   useEffect(() => {
//     if (score >= size) {
//       setIsWinner(true);
//     }
//   }, [score, size]);

//   const handleSizeChange = (e) => {
//     const newSize = parseInt(e.target.value, 10);
//     if (newSize > 1 && newSize < 12) {
//       setSize(newSize);
//       setGrid(initialGrid(newSize));
//       setCurrentNumber(1);
//       setIsGameStarted(false);
//       setError("");
//       setScore(0);
//       setIsWinner(false); // Reset the winner state
//     } else {
//       setError("Grid size must be between 1 and 11");
//     }
//   };

//   const handleCellClick = (row, col) => {
//     if (!isGameStarted && currentNumber <= size * size) {
//       if (!grid[row][col].value) {
//         const newGrid = grid.map((r, i) =>
//           r.map((cell, j) =>
//             i === row && j === col ? { ...cell, value: currentNumber } : cell
//           )
//         );
//         setGrid(newGrid);
//         setCurrentNumber(currentNumber + 1);
//         setError("");
//       } else {
//         setError("Cell is already filled. Choose another cell.");
//       }
//     } else if (isGameStarted) {
//       const newGrid = grid.map((r, i) =>
//         r.map((cell, j) =>
//           i === row && j === col ? { ...cell, selected: !cell.selected } : cell
//         )
//       );
//       const updatedGrid = markCompletedSequences(newGrid);
//       setGrid(updatedGrid);
//       setScore(calculateScore(updatedGrid));
//     }
//   };

//   const markCompletedSequences = (grid) => {
//     let updatedGrid = [...grid];

//     // Check rows
//     for (let i = 0; i < size; i++) {
//       if (grid[i].every((cell) => cell.selected || cell.completed)) {
//         updatedGrid = updatedGrid.map((row, rowIndex) =>
//           row.map((cell, colIndex) =>
//             rowIndex === i ? { ...cell, completed: true } : cell
//           )
//         );
//       }
//     }

//     // Check columns
//     for (let i = 0; i < size; i++) {
//       if (grid.every((row) => row[i].selected || row[i].completed)) {
//         updatedGrid = updatedGrid.map((row) =>
//           row.map((cell, colIndex) =>
//             colIndex === i ? { ...cell, completed: true } : cell
//           )
//         );
//       }
//     }

//     // Check top-left to bottom-right diagonal
//     if (grid.every((row, i) => row[i].selected || row[i].completed)) {
//       updatedGrid = updatedGrid.map((row, i) =>
//         row.map((cell, j) => (i === j ? { ...cell, completed: true } : cell))
//       );
//     }

//     // Check top-right to bottom-left diagonal
//     if (
//       grid.every(
//         (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
//       )
//     ) {
//       updatedGrid = updatedGrid.map((row, i) =>
//         row.map((cell, j) =>
//           j === size - i - 1 ? { ...cell, completed: true } : cell
//         )
//       );
//     }

//     return updatedGrid;
//   };

//   const calculateScore = (grid) => {
//     let score = 0;

//     // Check rows and columns
//     for (let i = 0; i < size; i++) {
//       // Check if all cells in a row are either selected or completed
//       if (grid[i].every((cell) => cell.selected || cell.completed)) score++;

//       // Check if all cells in a column are either selected or completed
//       if (grid.every((row) => row[i].selected || row[i].completed)) score++;
//     }

//     // Check diagonals
//     // Check top-left to bottom-right diagonal
//     if (grid.every((row, i) => row[i].selected || row[i].completed)) score++;

//     // Check top-right to bottom-left diagonal
//     if (
//       grid.every(
//         (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
//       )
//     )
//       score++;

//     return score;
//   };

//   const handleStartGame = () => {
//     setIsGameStarted(true);
//   };

//   const handleRestartGame = () => {
//     window.location.reload();
//   };

//   const handleReset = () => {
//     setGrid(initialGrid(size));
//     setIsGameStarted(false);
//     setCurrentNumber(1);
//     setError("");
//     setScore(0);
//     setIsWinner(false);
//   };

//   const isGridFilled = grid.flat().every((cell) => cell.value !== "");

//   return (
//     <div className="app">
//       <img src="/assets/logo.png" className="logo" alt="logo" />
//       {isWinner && (
//         <div className="winner-announcement">
//           <h1 className="bingo-text">BINGOOOOOOOO</h1>
//         </div>
//       )}
//       {isGameStarted && (
//         <div className="score-container">
//           <h2>Score: {score}</h2>
//         </div>
//       )}
//       {!isGameStarted ? (
//         <div className="size-input-container">
//           <label htmlFor="grid-size">Grid Size:</label>
//           <input
//             type="number"
//             id="grid-size"
//             value={size}
//             onChange={handleSizeChange}
//             min="1"
//             disabled={isGameStarted}
//           />
//         </div>
//       ) : null}
//       <table className={isGameStarted ? "bingo-table-active" : "bingo-table"}>
//         <tbody>
//           {grid.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, colIndex) => (
//                 <td
//                   key={colIndex}
//                   className={`bingo-cell ${cell.selected ? "selected" : ""} ${
//                     cell.completed ? "completed" : ""
//                   }`}
//                   onClick={() => handleCellClick(rowIndex, colIndex)}
//                 >
//                   <span className="cell-value">{cell.value}</span>
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {error && <div className="error-message">{error}</div>}
//       <div className="button-container">
//         <button
//           className={
//             isGridFilled ? "start-button-active" : "start-button-inactive"
//           }
//           onClick={!isGameStarted ? handleStartGame : handleRestartGame}
//           disabled={!isGridFilled}
//         >
//           {isGameStarted ? "Restart Game" : "Start Game"}
//         </button>
//         {!isGameStarted && (
//           <button className="reset-button" onClick={handleReset}>
//             Reset
//           </button>
//         )}
//       </div>

//       {/* <div className="footer">
//         <p>
//           Made by{" "}
//           <a href="github.com/shahfaisallive" target="_blank">
//             shahfaisallive
//           </a>
//         </p>
//       </div> */}
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect } from "react";
import "./index.css"; // Make sure to import the CSS file

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
  const [isWinner, setIsWinner] = useState(false); // New state to track the winner

  useEffect(() => {
    if (score >= size) {
      setIsWinner(true);

      // Hide "BINGOOOOOOOO" text after 3 seconds
      const timer = setTimeout(() => {
        setIsWinner(false);
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [score, size]);

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 1 && newSize < 12) {
      setSize(newSize);
      setGrid(initialGrid(newSize));
      setCurrentNumber(1);
      setIsGameStarted(false);
      setError("");
      setScore(0);
      setIsWinner(false); // Reset the winner state
    } else {
      setError("Grid size must be between 1 and 11");
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
      // Check if all cells in a row are either selected or completed
      if (grid[i].every((cell) => cell.selected || cell.completed)) score++;

      // Check if all cells in a column are either selected or completed
      if (grid.every((row) => row[i].selected || row[i].completed)) score++;
    }

    // Check diagonals
    // Check top-left to bottom-right diagonal
    if (grid.every((row, i) => row[i].selected || row[i].completed)) score++;

    // Check top-right to bottom-left diagonal
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
    setIsWinner(false);
  };

  const isGridFilled = grid.flat().every((cell) => cell.value !== "");

  return (
    <div className="app">
      <img src="/assets/logo.png" className="logo" alt="logo" />
      {isWinner && (
        <div className="winner-announcement">
          <h1 className="bingo-text">BINGOOOOOOOO!!</h1>
        </div>
      )}
      {isGameStarted && (
        <div className="score-container">
          <h2>Score: {score}</h2>
        </div>
      )}
      {!isGameStarted ? (
        <div className="size-input-container">
          <label htmlFor="grid-size">Grid Size:</label>
          <input
            type="number"
            id="grid-size"
            value={size}
            onChange={handleSizeChange}
            min="1"
            disabled={isGameStarted}
          />
        </div>
      ) : null}
      <table className={isGameStarted ? "bingo-table-active" : "bingo-table"}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`bingo-cell ${cell.selected ? "selected" : ""} ${
                    cell.completed ? "completed" : ""
                  }`}
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

      {/* <div className="footer">
        <p>
          Made by{" "}
          <a href="github.com/shahfaisallive" target="_blank">
            shahfaisallive
          </a>
        </p>
      </div> */}
    </div>
  );
}

export default App;
