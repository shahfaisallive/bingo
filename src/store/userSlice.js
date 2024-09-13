import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.authenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
