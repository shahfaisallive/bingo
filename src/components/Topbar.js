import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import SettingsModal from "./SettingsModal";

function TopBar({
  selectedColor,
  completedColor,
  fontFamily,
  handleSelectedColorChange,
  handleCompletedColorChange,
  handleFontChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="top-bar">
      <img src="/assets/logo.png" className="logo" alt="logo" />
      <FaCog className="settings-icon" onClick={openModal} />
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
