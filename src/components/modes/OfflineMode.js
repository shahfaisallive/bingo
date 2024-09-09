import React from "react";
import "./OfflineMode.css";

const OfflineMode = ({ handleSubModeSelect, handleModeReset }) => {
  return (
    <div className="offline-mode-selection">
      <h2>Play Offline</h2>

      <div className="button-wrapper">
        <button
          className="mode-control-button"
          onClick={() => handleSubModeSelect("vsFriends")}
        >
          Play vs Friends
        </button>
        <p className="tooltip-text">Challenge your friends in room!</p> {/* Tooltip */}
      </div>

      <div className="button-wrapper">
        <button
          className="mode-control-button" disabled
          onClick={() => handleSubModeSelect("vsBot")}
        >
          Play vs Bot
        </button>
        <p className="tooltip-text">Practice against a bot! (coming soon)</p> {/* Tooltip */}
      </div>

      <button className="go-back-button" onClick={handleModeReset}>
        Go Back
      </button>
    </div>
  );
};

export default OfflineMode;
