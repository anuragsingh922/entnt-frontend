import { configureStore } from "@reduxjs/toolkit";
import setUser from "./slices/user";
import setselectedCompanies from "./slices/selectedCompanies";

export const store = configureStore({
  reducer: {
    user: setUser,
    selectedCompanies : setselectedCompanies,
  },
});

export default store;
