// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState : {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;  // Set user in the state
    },
    clearUser: (state) => {
      state.user = null;  // Clear user
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
