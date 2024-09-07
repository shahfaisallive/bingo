import React, { useState } from "react";
import './TopBar.css';
import { FaCog } from "react-icons/fa";
import SettingsModal from "./SettingsModal";

function TopBar({
  selectedColor,
  completedColor,
  fontFamily,
  handleSelectedColorChange,
  handleCompletedColorChange,
  handleFontChange,
  gameMode, 
  handleModeReset, 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Add hover state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="top-bar">
      <img src="/assets/logo.png" className="logo" alt="logo" />
      <div className="settings-container">
      <button
        className="mode-button"
        onClick={handleModeReset}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? "Change Mode" : `${gameMode === "online" ? "Online Mode" : gameMode === "offline" ? "Offline Mode" : "Game Mode"}`}
      </button>
      <FaCog className="settings-icon" onClick={openModal} />
      </div>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
        handleSelectedColorChange={handleSelectedColorChange}
        handleCompletedColorChange={handleCompletedColorChange}
        handleFontChange={handleFontChange}
      />
    </div>
  );
}

export default TopBar;
