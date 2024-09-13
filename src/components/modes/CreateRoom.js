import React from "react";
import "./CreateRoom.css";

const CreateRoom = ({
  roomDetails,
  handleRoomDetailsChange,
  handleCreateRoom,
}) => {

  return (
    <div className="room-creation-form">
      <h2>Create Room</h2>
      <label>
        Room Name
        <input
          type="text"
          name="roomName"
          value={roomDetails.roomName}
          onChange={handleRoomDetailsChange}
          placeholder="Enter room name"
        />
      </label>
      <label>
        Grid Size
        <input
          type="number"
          name="gridSize"
          value={roomDetails.gridSize}
          min="2"
          max="11"
          onChange={handleRoomDetailsChange}
        />
      </label>
      <label>
        Max Players
        <input
          type="number"
          name="maxPlayers"
          value={roomDetails.maxPlayers}
          min="2"
          max="10"
          onChange={handleRoomDetailsChange}
        />
      </label>
      <button className="create-room-button" onClick={handleCreateRoom}>
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
