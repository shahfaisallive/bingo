import React from "react";
import './OnlineMode.css'

const OnlineMode = ({ handleSubModeSelect }) => {
  return (
    <div className="online-mode-selection">
      <h2>Play Online</h2>
      <button onClick={() => handleSubModeSelect("createRoom")}>Create Room</button>
      <button onClick={() => handleSubModeSelect("joinRoom")}>Join Room</button>
    </div>
  );
};

export default OnlineMode;
