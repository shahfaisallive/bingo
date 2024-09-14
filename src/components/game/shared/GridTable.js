import React from "react";
import './GridTable.css'

function GridTable({
  grid,
  isGameStarted,
  isGameHidden,
  handleCellClick,
  selectedColor,
  completedColor,
  fontFamily,
}) {
  return (
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
                className={`bingo-cell ${cell.completed ? "completed" : ""} ${
                  cell.selected ? "selected" : ""
                }`}
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
  );
}

export default GridTable;
