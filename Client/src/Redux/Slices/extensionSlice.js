// src/Redux/Slices/ExtensionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  installed: {
    "go-live": false,
    "live-preview": false,
  },
};

const extensionSlice = createSlice({
  name: "extensions",
  initialState,
  reducers: {
    installExtension: (state, action) => {
      state.installed[action.payload] = true;
    },
    uninstallExtension: (state, action) => {
      state.installed[action.payload] = false;
    },
  },
});

export const { installExtension, uninstallExtension } = extensionSlice.actions;
export default extensionSlice.reducer;
