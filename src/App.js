import React, { useState } from "react";
import "./index.css";
import Game from "./components/gameplay/Game";
import GameMode from "./components/modes/GameMode";
import OfflineMode from "./components/modes/OfflineMode";
import OnlineMode from "./components/modes/OnlineMode";
import CreateRoom from "./components/modes/CreateRoom";
import JoinRoom from "./components/modes/JoinRoom";
import TopBar from "./components/shared/Topbar";
import Footer from "./components/shared/Footer";

// Function to get the game mode and sub-mode from session storage
const getSavedMode = () => {
  return sessionStorage.getItem("gameMode") || null;
};
const getSavedSubMode = () => {
  return sessionStorage.getItem("subMode") || null;
};

function App() {
  const [gameMode, setGameMode] = useState(getSavedMode());
  const [subMode, setSubMode] = useState(getSavedSubMode());
  const [roomDetails, setRoomDetails] = useState({
    roomName: "",
    gridSize: 5,
    maxPlayers: 2,
  });

  const [selectedColor, setSelectedColor] = useState("#8551ca");
  const [completedColor, setCompletedColor] = useState("#1a7012");
  const [fontFamily, setFontFamily] = useState("Lobster");
  const [isGameHidden, setIsGameHidden] = useState(false); // Add this state

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setSubMode(null); // Reset sub-mode when a new mode is selected
    sessionStorage.setItem("gameMode", mode);
  };

  const handleSubModeSelect = (subMode) => {
    setSubMode(subMode);
    sessionStorage.setItem("subMode", subMode);
  };

  const handleRoomDetailsChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRoom = () => {
    if (roomDetails.roomName.trim()) {
      setGameMode("room");
    } else {
      alert("Room name is required.");
    }
  };

  const handleJoinRoom = (roomCode) => {
    console.log("Joining room with code:", roomCode);
    setGameMode("room");
  };

  // Define toggleHideGame function
  const toggleHideGame = () => {
    setIsGameHidden(!isGameHidden);
  };

  return (
    <div className="app">
      {/* Move TopBar to App.js */}
      <TopBar
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
        handleSelectedColorChange={(e) => setSelectedColor(e.target.value)}
        handleCompletedColorChange={(e) => setCompletedColor(e.target.value)}
        handleFontChange={(e) => setFontFamily(e.target.value)}
      />

      {/* Main Mode Selection */}
      {!gameMode && <GameMode handleModeSelect={handleModeSelect} />}

      {gameMode === "offline" && !subMode && (
        <OfflineMode handleSubModeSelect={handleSubModeSelect} />
      )}
      {gameMode === "offline" && subMode === "vsFriends" && (
        <Game
          isOnline={false}
          fontFamily={fontFamily}
          selectedColor={selectedColor}
          completedColor={completedColor}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden} // Pass this down to Game component
        />
      )}
      {gameMode === "offline" && subMode === "vsBot" && (
        <Game
          isOnline={false}
          vsBot={true}
          fontFamily={fontFamily}
          selectedColor={selectedColor}
          completedColor={completedColor}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden}
        />
      )}

      {gameMode === "online" && !subMode && (
        <OnlineMode handleSubModeSelect={handleSubModeSelect} />
      )}
      {gameMode === "online" && subMode === "createRoom" && (
        <CreateRoom
          roomDetails={roomDetails}
          handleRoomDetailsChange={handleRoomDetailsChange}
          handleCreateRoom={handleCreateRoom}
        />
      )}
      {gameMode === "online" && subMode === "joinRoom" && (
        <JoinRoom handleJoinRoom={handleJoinRoom} />
      )}

      {gameMode === "room" && (
        <Game
          isOnline={true}
          roomDetails={roomDetails}
          fontFamily={fontFamily}
          selectedColor={selectedColor}
          completedColor={completedColor}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden}
        />
      )}

      {/* Move Footer to App.js */}
      <Footer />
    </div>
  );
}

export default App;
