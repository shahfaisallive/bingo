import React, { useState } from 'react';
import './JoinRoom.css';

const JoinRoom = ({ handleJoinRoom }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  const handleJoin = () => {
    if (roomCode.trim()) {
      handleJoinRoom(roomCode); 
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
      <button className="join-room-button" onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
