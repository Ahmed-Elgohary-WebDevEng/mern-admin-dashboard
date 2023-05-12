import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "features/global/globalSlice.js";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
