import React, { useEffect } from "react";
import "./index.css";
import Game from "./components/game/Game";
import OfflineGame from "./components/game/offline/OfflineGame";
import OnlineGame from "./components/game/online/OnlineGame";
import GameMode from "./components/modes/GameMode";
import OfflineMode from "./components/modes/OfflineMode";
import OnlineMode from "./components/modes/OnlineMode";
import CreateRoom from "./components/modes/CreateRoom";
import JoinRoom from "./components/modes/JoinRoom";
import TopBar from "./components/shared/Topbar";
import Footer from "./components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "./store/userSlice";
import {
  setGameMode,
  setSubMode,
  updateRoomDetails,
  resetGame,
  toggleGameHidden,
} from "./store/gameSlice";
import { persistor } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    gameMode,
    subMode,
    roomDetails,
    selectedColor,
    completedColor,
    fontFamily,
    isGameHidden,
  } = useSelector((state) => state.game);
  const { authenticated, user } = useSelector((state) => state.user);

  // Handle token in URL and set user authentication state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      const decodedUser = jwtDecode(token);
      dispatch(loginSuccess(decodedUser));
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const decodedUser = jwtDecode(storedToken);
          dispatch(loginSuccess(decodedUser));
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("authToken");
        }
      }
    }
  }, [dispatch]);

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URI}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await fetch("/logout", { method: "GET" });
      localStorage.removeItem("authToken");
      dispatch(logoutSuccess());
      dispatch(resetGame());
      persistor.purge(); // Clear persisted state
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
    dispatch(setGameMode(mode));
    dispatch(setSubMode(null));
    sessionStorage.setItem("gameMode", mode);
  };

  const handleSubModeSelect = (subMode) => {
    dispatch(setSubMode(subMode));
    sessionStorage.setItem("subMode", subMode);
  };

  const handleModeReset = () => {
    dispatch(resetGame());
    sessionStorage.removeItem("gameMode");
    sessionStorage.removeItem("subMode");
  };

  const handleRoomDetailsChange = (e) => {
    dispatch(updateRoomDetails({ [e.target.name]: e.target.value }));
  };

  const handleCreateRoom = async () => {
    if (roomDetails.roomName.trim()) {
      try {
        const token = localStorage.getItem("authToken");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosInstance.post(
          "/room/create",
          roomDetails,
          config
        );

        if (response.data) {
          alert("Room Created Successfully");
        }
        dispatch(setGameMode("room"));
      } catch (error) {
        console.error("Failed to create room:", error);
        alert("Error creating room");
      }
    } else {
      alert("Room name is required.");
    }
  };

  const handleJoinRoom = async (roomCode) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Please login to join a room.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.post(
        `/room/join`,
        { roomCode },
        config
      );

      if (response.data) {
        const roomDetails = response.data;

        // Update the room details in Redux store
        dispatch(updateRoomDetails(roomDetails));

        // Set game mode to "room" and navigate the user to the game room
        dispatch(setGameMode("room"));
        alert("Successfully joined the room!");
      } else {
        alert("Failed to join the room.");
      }
    } catch (error) {
      console.error("Error joining room:", error);
      alert("An error occurred while joining the room.");
    }
  };

  const toggleHideGame = () => {
    dispatch(toggleGameHidden());
  };

  return (
    <div className="app">
      <TopBar
        selectedColor={selectedColor}
        completedColor={completedColor}
        fontFamily={fontFamily}
        handleSelectedColorChange={(e) =>
          dispatch(updateRoomDetails({ selectedColor: e.target.value }))
        }
        handleCompletedColorChange={(e) =>
          dispatch(updateRoomDetails({ completedColor: e.target.value }))
        }
        handleFontChange={(e) =>
          dispatch(updateRoomDetails({ fontFamily: e.target.value }))
        }
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
        <OfflineGame
          isOnline={false}
          fontFamily={fontFamily}
          selectedColor={selectedColor}
          completedColor={completedColor}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden}
        />
      )}
      {gameMode === "offline" && subMode === "vsBot" && (
        <OfflineGame
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
        <OnlineGame
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
