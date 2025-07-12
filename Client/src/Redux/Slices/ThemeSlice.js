import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme") || "dark";

const ThemeSlice = createSlice ({
    
    name: "theme",
    initialState: {
        mode: savedTheme,
    },

    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        },

        setTheme: (state, action) => {
            state.mode = action.payload
            localStorage.setItem("theme", state.mode);
        }
    }
})

export const {toggleTheme, setTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;

