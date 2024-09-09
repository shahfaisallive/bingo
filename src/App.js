import React, { useEffect, useState } from "react";
import "./index.css";
import Game from "./components/gameplay/Game";
import GameMode from "./components/modes/GameMode";
import OfflineMode from "./components/modes/OfflineMode";
import OnlineMode from "./components/modes/OnlineMode";
import CreateRoom from "./components/modes/CreateRoom";
import JoinRoom from "./components/modes/JoinRoom";
import TopBar from "./components/shared/Topbar";
import Footer from "./components/shared/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getSavedMode = () => {
  return sessionStorage.getItem("gameMode") || null;
};
const getSavedSubMode = () => {
  return sessionStorage.getItem("subMode") || null;
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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
  const [isGameHidden, setIsGameHidden] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle token in URL and set user authentication state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setAuthenticated(true);
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const decodedUser = jwtDecode(storedToken);
          setUser(decodedUser);
          setAuthenticated(true);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("authToken");
        }
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  const handleLogout = async () => {
    try {
      await fetch("/logout", { method: "GET" });
      localStorage.removeItem("authToken");
      setAuthenticated(false);
      setUser(null);
      setGameMode(null);
      setSubMode(null);
      sessionStorage.removeItem("gameMode");
      sessionStorage.removeItem("subMode");
      navigate("/");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const handleModeSelect = (mode) => {
    if (mode === "online" && !authenticated) {
      alert("Please login to play online!");
      return;
    }
    setGameMode(mode);
    setSubMode(null);
    sessionStorage.setItem("gameMode", mode);
  };

  const handleSubModeSelect = (subMode) => {
    setSubMode(subMode);
    sessionStorage.setItem("subMode", subMode);
  };

  const handleModeReset = () => {
    setGameMode(null);
    setSubMode(null);
    sessionStorage.removeItem("gameMode");
    sessionStorage.removeItem("subMode");
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

  const toggleHideGame = () => {
    setIsGameHidden(!isGameHidden);
  };

  return (
    <div className="app">
      <TopBar
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
        handleSelectedColorChange={(e) => setSelectedColor(e.target.value)}
        handleCompletedColorChange={(e) => setCompletedColor(e.target.value)}
        handleFontChange={(e) => setFontFamily(e.target.value)}
        handleModeReset={handleModeReset}
        gameMode={gameMode}
        authenticated={authenticated}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      {!gameMode && <GameMode handleModeSelect={handleModeSelect} />}

      {gameMode === "offline" && !subMode && (
        <OfflineMode
          handleSubModeSelect={handleSubModeSelect}
          handleModeReset={handleModeReset}
        />
      )}
      {gameMode === "offline" && subMode === "vsFriends" && (
        <Game
          isOnline={false}
          fontFamily={fontFamily}
          selectedColor={selectedColor}
          completedColor={completedColor}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden}
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
        <OnlineMode
          handleSubModeSelect={handleSubModeSelect}
          handleModeReset={handleModeReset}
        />
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

      <Footer />
    </div>
  );
}

export default App;
