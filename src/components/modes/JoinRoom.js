// import React, { useState } from 'react';
// import './JoinRoom.css';

// const JoinRoom = ({ handleJoinRoom, socket }) => {
//   const [roomCode, setRoomCode] = useState("");

//   const handleRoomCodeChange = (e) => {
//     setRoomCode(e.target.value);
//   };

//   const handleJoin = () => {
//     if (roomCode.trim()) {
//       handleJoinRoom(roomCode);
//       socket.emit("joinRoom", roomCode); // Emit the join room event
//     } else {
//       alert("Please enter a valid room code.");
//     }
//   };

//   return (
//     <div className="join-room-form">
//       <h2>Join Room</h2>
//       <label>
//         Room Code
//         <input
//           type="text"
//           name="roomCode"
//           value={roomCode}
//           onChange={handleRoomCodeChange}
//           placeholder="Enter room code"
//         />
//       </label>
//       <button className="join-room-button" onClick={handleJoin}>Join Room</button>
//     </div>
//   );
// };

// export default JoinRoom;

import React, { useState } from "react";
import "./JoinRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomDetails, setGameMode } from "../../store/gameSlice"; // Import necessary actions

const JoinRoom = ({ socket }) => {
  const [roomCode, setRoomCode] = useState("");
  const { id } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  const handleJoin = () => {
    if (roomCode.trim()) {
      socket.emit("joinRoom", { roomCode, playerId: id });

      socket.on("playerJoined", (data) => {
        console.log(data);
        dispatch(updateRoomDetails(data.roomDetails));
        dispatch(setGameMode("room"));
      });

      // Handle error if joining fails
      socket.on("error", (error) => {
        alert(error.message || "Failed to join room");
      });
    } else {
      alert("Please enter a valid room code.");
    }
  };

  return (
    <div className="join-room-form">
      <h2>Join Room</h2>
      <label>
        Room Code
        <input
          type="text"
          name="roomCode"
          value={roomCode}
          onChange={handleRoomCodeChange}
          placeholder="Enter room code"
        />
      </label>
      <button className="join-room-button" onClick={handleJoin}>
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
