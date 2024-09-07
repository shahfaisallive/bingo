import React from "react";
import './SettingsModal.css'

function SettingsModal({
  isOpen,
  onClose,
  selectedColor,
  completedColor,
  fontFamily,
  handleSelectedColorChange,
  handleCompletedColorChange,
  handleFontChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Settings</h2>
        <div className="modal-tools">
          <div className="setting-container">
            <label>Select Font:</label>
            <select value={fontFamily} onChange={handleFontChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Lobster">Lobster</option>
              <option value="Roboto">Roboto</option>
              <option value="Indie Flower">Indie Flower</option>
              <option value="Kalam">Kalam</option>
              <option value="Tillana">Tillana</option>
              <option value="Dancing Script">Dancing Script</option>
            </select>
          </div>
          <div className="setting-container">
            <label>Select Scene:</label>
            <p>Coming soon</p>
          </div>
          <div className="setting-container">
            <label>Cell Color 1:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={handleSelectedColorChange}
            />
            <label>Cell Color 2:</label>
            <input
              type="color"
              value={completedColor}
              onChange={handleCompletedColorChange}
            />
          </div>
        </div>
        <button className="modal-ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
