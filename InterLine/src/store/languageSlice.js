import { createSlice } from "@reduxjs/toolkit";
import { LANGUAGES_DETAILS } from '@/constants.js'

const initialState = {
    language: "javascript",
    version: "1.32.3",
    snippet: `console.log("Welcome to Interline");`
};

const langSlice = createSlice({
    name: "language",
    initialState: initialState,
    reducers: {
        toggleLanguage(state, action) {
            // console.log(action.payload)
            state.language = action.payload.language;
            state.version = LANGUAGES_DETAILS[action.payload.language][0];
            state.snippet = action.payload.code || LANGUAGES_DETAILS[action.payload.language][1];
        },
    },
});

export const { toggleLanguage } = langSlice.actions;

export default langSlice.reducer;
