import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    return res.data;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/me",
  async (token) => {
    const res = await axios.get("https://dummyjson.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

const slice = createSlice({
  name: "user",
  initialState: {
    token: null,
    refreshToken: null,
    user: null,
    isFromBroadcast: false,
  },

  reducers: {
    applyUserFromBroadcast(state, action) {
      state.isFromBroadcast = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isFromBroadcast = false;
    },

    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { applyUserFromBroadcast, logout } = slice.actions;
export default slice.reducer;
