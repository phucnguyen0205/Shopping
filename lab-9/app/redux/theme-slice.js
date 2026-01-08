import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
    isFromBroadcast: false,
  },
  reducers: {
    toggleTheme(state) {
      if (state.isFromBroadcast) return; 
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    applyThemeFromBroadcast(state, action) {
      state.isFromBroadcast = true;
      state.theme = action.payload;        
      state.isFromBroadcast = false;
    }
  }
});

export const { toggleTheme, applyThemeFromBroadcast } = slice.actions;
export default slice.reducer;
