import confetti from "canvas-confetti";

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

export const handleSizeChange = (newSize, initialGrid, setStateFuncs) => {
  const [setSize, setGrid, setCurrentNumber, setIsGameStarted, setError, setScore, setIsWinner, setIsPerfectBingo, setShowLottie] = setStateFuncs;

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

export const markCompletedSequences = (grid, size) => {
  let updatedGrid = [...grid];

  // Rows
  for (let i = 0; i < size; i++) {
    if (grid[i].every((cell) => cell.selected || cell.completed)) {
      updatedGrid = updatedGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === i ? { ...cell, completed: true } : cell
        )
      );
    }
  }

  // Columns
  for (let i = 0; i < size; i++) {
    if (grid.every((row) => row[i].selected || row[i].completed)) {
      updatedGrid = updatedGrid.map((row) =>
        row.map((cell, colIndex) =>
          colIndex === i ? { ...cell, completed: true } : cell
        )
      );
    }
  }

  // Diagonal 1
  if (grid.every((row, i) => row[i].selected || row[i].completed)) {
    updatedGrid = updatedGrid.map((row, i) =>
      row.map((cell, j) => (i === j ? { ...cell, completed: true } : cell))
    );
  }

  // Diagonal 2
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

export const calculateScore = (grid, size) => {
  let score = 0;
  // Rows
  for (let i = 0; i < size; i++) {
    if (grid[i].every((cell) => cell.selected || cell.completed)) score++;
    if (grid.every((row) => row[i].selected || row[i].completed)) score++;
  }
  // Diagonal 1
  if (grid.every((row, i) => row[i].selected || row[i].completed)) score++;
  // Diagonal 2
  if (
    grid.every(
      (row, i) => row[size - i - 1].selected || row[size - i - 1].completed
    )
  )
    score++;

  return score;
};
