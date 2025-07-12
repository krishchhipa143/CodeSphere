import { createSlice } from "@reduxjs/toolkit"

const AuthSlice = createSlice ({
    name: "Auth",
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        error: null
    },

    reducers:{
        login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    },
});


export const {login, logout} = AuthSlice.actions;

export default AuthSlice.reducer;