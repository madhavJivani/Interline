import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './themeSlice.js'
import langSlice from './languageSlice.js'
import userSlice from './userSlice.js'
import optionSlice from './optionSlice.js'

const store = configureStore({
    reducer: {
        // Add all reducers here
        theme: themeSlice,
        user:userSlice,
        language: langSlice,
        option: optionSlice,
    }
});

export default store;