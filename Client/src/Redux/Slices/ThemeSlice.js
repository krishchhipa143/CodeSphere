import { createSlice } from "@reduxjs/toolkit";


const ThemeSlice = createSlice ({
    name: "theme",
    initialState: {mode:"light"},

    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setTheme: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const {toggleTheme, setTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;

