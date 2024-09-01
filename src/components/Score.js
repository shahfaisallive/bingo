import React from "react";

const Score = ({ score, fontFamily, isGameHidden }) => {
  return (
    <div
      className="score-container"
      style={{
        fontFamily: fontFamily,
        filter: isGameHidden ? "blur(10px)" : "none",
      }}
    >
      <h2 className="score-text">Score: {score}</h2>
    </div>
  );
};

export default Score;
