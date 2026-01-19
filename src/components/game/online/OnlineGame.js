import React, { useState, useEffect } from "react";
import "./OnlineGame.css";
import Score from "../shared/Score";
import GridCounter from "../shared/GridCounter";
import GridTable from "../shared/GridTable";
import GameButtons from "../shared/GameButtons";
import ChatBox from "./ChatBox";
import RoomMembers from "./RoomMembers";
import Lottie from "lottie-react";
import {
  initialGrid,
  launchConfetti,
  markCompletedSequences,
  calculateScore,
  checkPerfectBingo,
} from "../../../utils/gameUtils";
import { animations } from "../../../utils/animations";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomDetails, setIsGameStarted } from "../../../store/gameSlice";

function OnlineGame({
  socket,
  roomDetails,
  fontFamily,
  selectedColor,
  completedColor,
  toggleHideGame,
  isGameHidden,
}) {
  const dispatch = useDispatch();
  const { players, currentUserId } = useSelector(
    (state) => state.game.roomDetails
  );
  const [size, setSize] = useState(roomDetails.gridSize || 5);
  const [grid, setGrid] = useState(initialGrid(size));
  const [isGameStarted, setIsGameStartedLocal] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [isPerfectBingo, setIsPerfectBingo] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [animationData, setAnimationData] = useState(animations[0]);

  // Join the room on component mount
  useEffect(() => {
    if (socket && roomDetails.roomCode && currentUserId) {
      console.log("Here: ", currentUserId);
      socket.emit("joinRoom", {
        roomCode: roomDetails.roomCode,
        playerId: currentUserId,
      });

      socket.on("playerJoined", (data) => {
        console.log("Player joined", data);
        dispatch(updateRoomDetails({ players: data.players }));
      });

      socket.on("gameStarted", () => {
        setIsGameStartedLocal(true);
        dispatch(setIsGameStarted(true));
      });

      socket.on("cellSelected", (data) => {
        console.log(`Cell selected by player ${data.playerId}: ${data.number}`);
        // Handle cell update in the game grid for all players
      });

      return () => {
        socket.off("playerJoined");
        socket.off("gameStarted");
        socket.off("cellSelected");
      };
    } else {
      console.error("Socket, roomCode, or playerId is not available.");
    }
  }, [socket, roomDetails.roomCode, currentUserId, dispatch]);

  // Handle game over with confetti effect
  useEffect(() => {
    if (score >= size) {
      const perfectBingo = checkPerfectBingo(grid);
      if (perfectBingo) {
        setIsPerfectBingo(true);
        launchConfetti(3);
      } else {
        launchConfetti(1);
      }

      setIsWinner(true);
      const randomIndex = Math.floor(Math.random() * animations.length);
      setAnimationData(animations[randomIndex]);
      setShowLottie(true);
    }
  }, [score, size, grid]);

  const handleSizeChange = (newSize) => {
    if (newSize > 1 && newSize < 12) {
      setSize(newSize);
      setGrid(initialGrid(newSize));
      setCurrentNumber(1);
      setIsGameStartedLocal(false);
      setError("");
      setScore(0);
      setIsWinner(false);
      setIsPerfectBingo(false);
      setShowLottie(false);
    } else {
      setError("Grid size must be between 2 and 11");
    }
  };

  const handleCellClick = (row, col) => {
    if (!isGameStarted && currentNumber <= size * size) {
      if (!grid[row][col].value) {
        const newGrid = grid.map((r, i) =>
          r.map((cell, j) =>
            i === row && j === col ? { ...cell, value: currentNumber } : cell
          )
        );
        setGrid(newGrid);
        setCurrentNumber(currentNumber + 1);
        setError("");

        // Emit the cell selection event to the server
        socket.emit("selectCell", {
          roomCode: roomDetails.roomCode,
          playerId: currentUserId,
          number: currentNumber,
        });
      } else {
        setError("Cell is already filled. Choose another cell.");
      }
    } else if (isGameStarted) {
      const newGrid = grid.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? { ...cell, selected: !cell.selected } : cell
        )
      );
      const updatedGrid = markCompletedSequences(newGrid, size);
      setGrid(updatedGrid);
      setScore(calculateScore(updatedGrid, size));
    }
  };

  const handleStartGame = () => {
    // Emit event to start the game
    socket.emit("startGame", {
      roomCode: roomDetails.roomCode,
      hostId: roomDetails.host,
    });
  };

  return (
    <div className="online-game-wrapper">
      <div className="members-container">
        <RoomMembers
          socket={socket}
          members={players || []}
          maxMembers={roomDetails.maxPlayers}
          currentUserId={currentUserId}
          handleRemoveMember={() => {}}
          handleLeaveRoom={() => {}}
        />
      </div>
      <div className="game-box-container">
        {isGameStarted && (
          <Score
            score={score}
            fontFamily={fontFamily}
            isGameHidden={isGameHidden}
            isWinner={isWinner}
            isPerfectBingo={isPerfectBingo}
          />
        )}
        {!isGameStarted && <GridCounter gameMode="online" size={size} />}
        <GridTable
          grid={grid}
          isGameStarted={isGameStarted}
          isGameHidden={isGameHidden}
          handleCellClick={handleCellClick}
          selectedColor={selectedColor}
          completedColor={completedColor}
          fontFamily={fontFamily}
        />
        {error && <div className="error-message">{error}</div>}
        <GameButtons
          isGridFilled={grid.flat().every((cell) => cell.value !== "")}
          isGameStarted={isGameStarted}
          handleStartGame={handleStartGame}
          handleRestartGame={() => {
            setGrid(initialGrid(size));
            setIsGameStartedLocal(false);
            setCurrentNumber(1);
            setError("");
            setScore(0);
            setIsWinner(false);
            setIsPerfectBingo(false);
            setShowLottie(false);
          }}
          toggleHideGame={toggleHideGame}
          isGameHidden={isGameHidden}
          fontFamily={fontFamily}
        />
        {showLottie && (
          <div className="lottie-animation">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>
      <div className="chat-box-container">
        {/* <ChatBox socket={socket} roomCode={roomDetails.roomCode} /> */}
      </div>
    </div>
  );
}

export default OnlineGame;
