import React from "react";
import './GameMode.css'

const GameMode = ({ handleModeSelect }) => {
  return (
    <div className="game-mode-selection">
      <img src="/assets/play-offline.png" className="game-mode-icons" onClick={() => handleModeSelect("offline")} alt="offline-mode"/>
      <img src="/assets/play-online.png" className="game-mode-icons" onClick={() => handleModeSelect("online")} alt="online-mode" />
    </div>
  );
};

export default GameMode;
