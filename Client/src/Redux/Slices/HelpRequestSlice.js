import { createSlice } from "@reduxjs/toolkit";


const helpRequestSlice =  createSlice({
    name: "helpRequests",
    initialState: {
        requests: []
    },

    reducers: {
        addHelpRequests: (state, action) => {
      state.requests.push(action.payload);
    },
    setHelpRequests: (state, action) => {
      state.requests = action.payload;
    },
    }
})

export const {addHelpRequests, setHelpRequests} = helpRequestSlice.actions;
export default helpRequestSlice.reducer;