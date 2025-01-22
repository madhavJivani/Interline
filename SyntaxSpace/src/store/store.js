import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import aiSlice from "./aiSlice";
import documentSlice from "./documentSlice";

const store = configureStore({
    reducer: {
        theme: themeSlice,
        user: userSlice,
        ai: aiSlice,
        documents: documentSlice,
    },
});

export default store;