import React from "react";
import './Score.css'

const Score = ({ score, fontFamily, isGameHidden, isWinner, isPerfectBingo }) => {
  return (
    <div
      className="score-container"
      style={{
        fontFamily: fontFamily,
        filter: isGameHidden ? "blur(10px)" : "none",
      }}
    >
      {isWinner ? (
        isPerfectBingo ? (
          <h2 className="bingo-animation">PERFECT BINGOOOO!!!</h2> 
        ) : (
          <h2 className="bingo-animation">BINGOOOOOO!!!</h2> 
        )
      ) : (
        <h2 className="score-text">Score: {score}</h2> 
      )}
    </div>
  );
};

export default Score;
