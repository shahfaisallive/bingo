import React, { useState } from "react";
import "./TopBar.css";
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
  authenticated,
  user,
  handleLogin,
  handleLogout,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          {isHovered
            ? "Change Mode"
            : `${gameMode === "online" ? "Online Mode" : "Offline Mode"}`}
        </button>

        {authenticated ? (
          <div className="user-info-container">
            <button className="user-name-button" onClick={toggleDropdown}>
              {user.name}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p>{user.email}</p>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login with Google
          </button>
        )}

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
