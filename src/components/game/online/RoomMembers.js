// import React, { useEffect } from "react";
// import './RoomMembers.css';
// import { useDispatch, useSelector } from "react-redux";
// import { removeMember, leaveRoom, updateRoomDetails } from "../../../store/gameSlice";

// const RoomMembers = ({ socket }) => {
//   const dispatch = useDispatch();

//   // Access room details from Redux state
//   const { players = [], maxPlayers = 0, host, roomCode } = useSelector((state) => state.game.roomDetails);
//   const currentUserId = useSelector((state) => state.user.user.id);

//   // Listen for socket events to update room members
//   useEffect(() => {
//     if (socket) {
//       // When a player joins the room
//       socket.on("playerJoined", (data) => {
//         dispatch(updateRoomDetails({ players: data.players }));
//       });

//       // When a player leaves the room
//       socket.on("playerLeft", ({ playerId }) => {
//         dispatch(updateRoomDetails({
//           players: players.filter((member) => member.id !== playerId)
//         }));
//       });

//       // Cleanup on component unmount
//       return () => {
//         socket.off("playerJoined");
//         socket.off("playerLeft");
//       };
//     }
//   }, [socket, dispatch, players]);

//   const handleRemoveMember = (memberId) => {
//     // Emit socket event to remove the member
//     socket.emit("removePlayer", { roomCode, playerId: memberId });
//     dispatch(removeMember(memberId));
//   };

//   const handleLeaveRoom = () => {   
//     // Emit socket event for leaving the room
//     socket.emit("leaveRoom", { roomCode, playerId: currentUserId });
//     dispatch(leaveRoom());
//   };

//   return (
//     <div className="members-box">
//       <div className="members-header">
//         <h3>{`${players.length}/${maxPlayers} Members`}</h3>
//       </div>
//       <ul className="members-list">
//         {players.map((member) => (
//           <li key={member.id} className="member-item">
//             <div className="member-details">
//               <p className="member-name">{member.player.name}</p>
//               {member.id !== currentUserId && member.id !== host && (
//                 <button
//                   className="remove-member-button"
//                   onClick={() => handleRemoveMember(member.player._id)}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button className="leave-room-button" onClick={handleLeaveRoom}>
//         Leave Room
//       </button>
//     </div>
//   );
// };

// export default RoomMembers;





import React, { useEffect } from "react";
import './RoomMembers.css';
import { useDispatch, useSelector } from "react-redux";
import { removeMember, leaveRoom, updateRoomDetails } from "../../../store/gameSlice";

const RoomMembers = ({ socket }) => {
  const dispatch = useDispatch();

  // Access room details from Redux state
  const { players = [], maxPlayers = 0, host, roomCode } = useSelector((state) => state.game.roomDetails);
  const currentUserId = useSelector((state) => state.user.id); // Assuming user id is in the state

  // Listen for socket events to update room members
  useEffect(() => {
    if (socket) {
      // When a player joins the room
      socket.on("playerJoined", (data) => {
        dispatch(updateRoomDetails({ players: data.players }));
      });

      // When a player leaves the room
      socket.on("playerLeft", ({ playerId }) => {
        dispatch(updateRoomDetails({
          players: players.filter((member) => member.player._id !== playerId)
        }));
      });

      // When the host changes
      socket.on("hostChanged", ({ newHostId }) => {
        dispatch(updateRoomDetails({ host: newHostId }));
      });

      // Cleanup on component unmount
      return () => {
        socket.off("playerJoined");
        socket.off("playerLeft");
        socket.off("hostChanged");
      };
    }
  }, [socket, dispatch, players]);

  const handleRemoveMember = (memberId) => {
    // Emit socket event to remove the member
    socket.emit("removePlayer", { roomCode, playerId: memberId });
    dispatch(removeMember(memberId));
  };

  const handleLeaveRoom = () => {
    // Emit socket event for leaving the room
    socket.emit("leaveRoom", { roomCode, playerId: currentUserId });
    dispatch(leaveRoom());
  };

  return (
    <div className="members-box">
      <div className="members-header">
        <h3>{`${players.length}/${maxPlayers} Members`}</h3>
      </div>
      <ul className="members-list">
        {players.map((member) => (
          <li key={member.player._id} className="member-item">
            <div className="member-details">
              <p className="member-name">{member.player.name}</p>
              {member.player._id !== currentUserId && member.player._id !== host && (
                <button
                  className="remove-member-button"
                  onClick={() => handleRemoveMember(member.player._id)}
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="leave-room-button" onClick={handleLeaveRoom}>
        Leave Room
      </button>
    </div>
  );
};

export default RoomMembers;
