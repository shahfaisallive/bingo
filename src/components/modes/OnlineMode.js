import React from "react";
import './OnlineMode.css'

const OnlineMode = ({ handleSubModeSelect, handleModeReset }) => {
  return (
    <div className="online-mode-selection">
      <h2>Play Online</h2>
      <button className="mode-control-button" onClick={() => handleSubModeSelect("createRoom")}>Create Room</button>
      <button className="mode-control-button" onClick={() => handleSubModeSelect("joinRoom")}>Join Room</button>
      <button className="go-back-button" onClick={handleModeReset}>Go Back</button>
    </div>
  );
};

export default OnlineMode;
