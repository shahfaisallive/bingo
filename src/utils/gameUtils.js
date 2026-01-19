// utils/gameUtils.js
import confetti from "canvas-confetti";

// Helper to initialize grid
export const initialGrid = (size) => 
  Array(size)
    .fill(null)
    .map(() => Array(size).fill({ value: "", selected: false, completed: false }));

// Confetti launcher
export const launchConfetti = (multiple) => {
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

// Mark completed sequences (rows, columns, diagonals)
export const markCompletedSequences = (grid, size) => {
  let updatedGrid = [...grid];

  // Rows and columns check
  for (let i = 0; i < size; i++) {
    if (grid[i].every((cell) => cell.selected || cell.completed)) {
      updatedGrid = updatedGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === i ? { ...cell, completed: true } : cell
        )
      );
    }
    if (grid.every((row) => row[i].selected || row[i].completed)) {
      updatedGrid = updatedGrid.map((row) =>
        row.map((cell, colIndex) =>
          colIndex === i ? { ...cell, completed: true } : cell
        )
      );
    }
  }

  // Diagonal checks
  if (grid.every((row, i) => row[i].selected || row[i].completed)) {
    updatedGrid = updatedGrid.map((row, i) =>
      row.map((cell, j) => (i === j ? { ...cell, completed: true } : cell))
    );
  }

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

// Calculate score based on grid
export const calculateScore = (grid, size) => {
  let score = 0;
  for (let i = 0; i < size; i++) {
    if (grid[i].every((cell) => cell.selected || cell.completed)) score++;
    if (grid.every((row) => row[i].selected || row[i].completed)) score++;
  }
  if (grid.every((row, i) => row[i].selected || row[i].completed)) score++;
  if (
    grid.every(
      (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
    )
  )
    score++;

  return score;
};

// Check for Perfect Bingo
export const checkPerfectBingo = (grid) => {
  return grid.flat().every((cell) => !cell.selected || cell.completed);
};

// Handle random fill for grid
export const handleRandomFill = (size, setGrid, setCurrentNumber) => {
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
