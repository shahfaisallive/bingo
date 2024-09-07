import React from "react";
import "./OnlineMode.css";

const OnlineMode = ({ handleSubModeSelect, handleModeReset }) => {
  return (
    <div className="online-mode-selection">
      <h2>Play Online</h2>

      <div className="button-wrapper">
        <button
          className="mode-control-button"
          onClick={() => handleSubModeSelect("createRoom")}
        >
          Create Room
        </button>
        <p className="tooltip-text">Host a room and invite friends!</p>{" "}
        {/* Tooltip */}
      </div>

      <div className="button-wrapper">
        <button
          className="mode-control-button"
          onClick={() => handleSubModeSelect("joinRoom")}
        >
          Join Room
        </button>
        <p className="tooltip-text">Join an existing room!</p> {/* Tooltip */}
      </div>

      <button className="go-back-button" onClick={handleModeReset}>
        Go Back
      </button>
    </div>
  );
};

export default OnlineMode;
