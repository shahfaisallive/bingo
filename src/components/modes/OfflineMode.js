import React from "react";
import './OfflineMode.css'

const OfflineMode = ({ handleSubModeSelect }) => {
  return (
    <div className="offline-mode-selection">
      <h2>Play Offline</h2>
      <button onClick={() => handleSubModeSelect("vsFriends")}>Play vs Friends</button>
      <button onClick={() => handleSubModeSelect("vsBot")}>Play vs Bot</button>
    </div>
  );
};

export default OfflineMode;
