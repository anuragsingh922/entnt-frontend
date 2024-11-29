import { configureStore } from "@reduxjs/toolkit";
import setUser from "./slices/user";

export const store = configureStore({
  reducer: {
    user: setUser,
  },
});

export default store;
