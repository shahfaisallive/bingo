import React from "react";
import './OfflineMode.css';

const OfflineMode = ({ handleSubModeSelect, handleModeReset }) => {
  return (
    <div className="offline-mode-selection">
      <h2>Play Offline</h2>
      <button className="mode-control-button" onClick={() => handleSubModeSelect("vsFriends")}>Play vs Friends</button>
      <button className="mode-control-button" onClick={() => handleSubModeSelect("vsBot")}>Play vs Bot</button>
      <button className="go-back-button" onClick={handleModeReset}>Go Back</button>
    </div>
  );
};

export default OfflineMode;
