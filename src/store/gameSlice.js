import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameMode: null,
  subMode: null,
  roomDetails: {
    roomName: "",
    gridSize: 5,
    maxPlayers: 2,
  },
  selectedColor: "#8551ca",
  completedColor: "#1a7012",
  fontFamily: "Lobster",
  isGameHidden: false,
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
        gridSize: 5,
        maxPlayers: 2,
      };
    },
    toggleGameHidden: (state) => {
      state.isGameHidden = !state.isGameHidden;
    },
  },
});

export const {
  setGameMode,
  setSubMode,
  updateRoomDetails,
  resetGame,
  toggleGameHidden,
} = gameSlice.actions;
export default gameSlice.reducer;
