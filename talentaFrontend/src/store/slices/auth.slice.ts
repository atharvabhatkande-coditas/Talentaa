import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/auth.types";

const initialState: AuthState = {
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  id: null,
  role: null,
  firstName:null,
  lastName:null,
  email:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
    },
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("access_token", action.payload.accessToken);
    },

    setUserDetails: (
      state,
      action: PayloadAction<{ id: string; role: string ,firstName?:string,lastName?:string,email?:string}>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.firstName=action.payload.firstName;
      state.lastName=action.payload.lastName;
      state.email=action.payload.email
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.id = null;
      state.role = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, setUserDetails,setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
