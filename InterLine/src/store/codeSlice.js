import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
    name: "code",
    initialState: [],
    reducers: {
        setCodes(state, action) {
            return action.payload;
        },
        removeCodes() {
            return [];
        },
    },
});

export const { setCodes, removeCodes } = codeSlice.actions;

export default codeSlice.reducer;
