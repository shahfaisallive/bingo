import React from "react";

function TopBar({
  selectedColor,
  completedColor,
  fontFamily,
  handleSelectedColorChange,
  handleCompletedColorChange,
  handleFontChange,
}) {
  return (
    <div className="top-bar">
      <img src="/assets/logo.png" className="logo" alt="logo" />
      <div className="custom-tools">
        <div className="color-pickers">
          <input
            type="color"
            value={selectedColor}
            onChange={handleSelectedColorChange}
          />
          <input
            type="color"
            value={completedColor}
            onChange={handleCompletedColorChange}
          />
        </div>
        <div className="font-selector">
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
      </div>
    </div>
  );
}

export default TopBar;
