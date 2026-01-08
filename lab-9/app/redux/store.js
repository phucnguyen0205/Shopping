import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme-slice";
import userReducer from "./user-slice";
import { bcMiddleware } from "./bc-middleware";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }).concat(bcMiddleware),
});
