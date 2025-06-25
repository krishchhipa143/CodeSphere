import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./Slices/ThemeSlice";
import AuthSlice from "./Slices/AuthSlice"

const store = configureStore(
    {
        reducer:{
            theme:ThemeReducer,
            auth: AuthSlice,
        } 
    }
)

export default store;