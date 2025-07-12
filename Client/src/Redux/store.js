import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./Slices/ThemeSlice";
import AuthSlice from "./Slices/AuthSlice";
import helpRequestReducer from "./Slices/HelpRequestSlice";
import extensionReducer from "./Slices/extensionSlice";

const store = configureStore(
    {
        reducer:{
            theme:ThemeReducer,
            auth: AuthSlice,
            helpRequests: helpRequestReducer,
            extensions: extensionReducer,
        } 
    }
)

export default store;