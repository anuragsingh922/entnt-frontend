// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectedCompanies = createSlice({
  name: "selectedCompanies",
  initialState: [],
  reducers: {
    setselectedCompanies: (state, action) => {
      return action.payload; // Set user in the state
    },
    clearselectedCompanies: (state) => {
      state.user = null; // Clear user
    },
  },
});

export const { setselectedCompanies, clearselectedCompanies } =
  selectedCompanies.actions;
export default selectedCompanies.reducer;
