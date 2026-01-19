// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   gameMode: null,
//   subMode: null,
//   roomDetails: {
//     roomName: "",
//     host: null, // host will reference the room creator
//     gridSize: 5,
//     maxPlayers: 4,
//     players: [], // players will reference the members of the room
//     roomCode: "",
//     createdAt: null, // store the creation time of the room
//   },
//   selectedColor: "#8551ca",
//   completedColor: "#1a7012",
//   fontFamily: "Lobster",
//   isGameHidden: false,
//   isGameStarted: false, // Add the isGameStarted flag
// };

// const gameSlice = createSlice({
//   name: "game",
//   initialState,
//   reducers: {
//     setGameMode: (state, action) => {
//       state.gameMode = action.payload;
//     },
//     setSubMode: (state, action) => {
//       state.subMode = action.payload;
//     },
//     updateRoomDetails: (state, action) => {
//       state.roomDetails = { ...state.roomDetails, ...action.payload };
//     },
//     resetGame: (state) => {
//       state.gameMode = null;
//       state.subMode = null;
//       state.roomDetails = {
//         roomName: "",
//         host: null,
//         gridSize: 5,
//         maxPlayers: 4,
//         players: [],
//         roomCode: "",
//         createdAt: null,
//       };
//       state.isGameStarted = false; // Reset the game start state
//     },
//     toggleGameHidden: (state) => {
//       state.isGameHidden = !state.isGameHidden;
//     },
//     removeMember: (state, action) => {
//       state.roomDetails.players = state.roomDetails.players.filter(
//         (player) => player.id !== action.payload
//       );
//     },
//     leaveRoom: (state) => {
//       state.roomDetails = initialState.roomDetails; // Reset room details when leaving the room
//     },
//     setIsGameStarted: (state, action) => {
//       state.isGameStarted = action.payload;
//     },
//   },
// });

// export const {
//   setGameMode,
//   setSubMode,
//   updateRoomDetails,
//   resetGame,
//   toggleGameHidden,
//   removeMember,
//   leaveRoom,
//   setIsGameStarted, // Export the new action
// } = gameSlice.actions;

// export default gameSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameMode: null,
  subMode: null,
  roomDetails: {
    roomName: "",
    host: null,
    gridSize: 5,
    maxPlayers: 4,
    players: [],
    roomCode: "",
    createdAt: null,
  },
  selectedColor: "#8551ca",
  completedColor: "#1a7012",
  fontFamily: "Lobster",
  isGameHidden: false,
  isGameStarted: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setSubMode: (state, action) => {
      state.subMode = action.payload;
    },
    updateRoomDetails: (state, action) => {
      state.roomDetails = { ...state.roomDetails, ...action.payload };
    },
    resetGame: (state) => {
      state.gameMode = null;
      state.subMode = null;
      state.roomDetails = {
        roomName: "",
        host: null,
        gridSize: 5,
        maxPlayers: 4,
        players: [],
        roomCode: "",
        createdAt: null,
      };
      state.isGameStarted = false;
    },
    toggleGameHidden: (state) => {
      state.isGameHidden = !state.isGameHidden;
    },
    removeMember: (state, action) => {
      state.roomDetails.players = state.roomDetails.players.filter(
        (player) => player.player._id !== action.payload
      );
    },
    leaveRoom: (state) => {
      state.roomDetails = initialState.roomDetails;
    },
    setIsGameStarted: (state, action) => {
      state.isGameStarted = action.payload;
    },
  },
});

export const {
  setGameMode,
  setSubMode,
  updateRoomDetails,
  resetGame,
  toggleGameHidden,
  removeMember,
  leaveRoom,
  setIsGameStarted,
} = gameSlice.actions;

export default gameSlice.reducer;
