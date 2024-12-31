import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
    editorTheme: "vs-dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "dark" ? "light" : "dark";
            if (state.theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
        toggleEditorTheme(state, action) {
            state.editorTheme = action.payload;
        },

    },
});

export const { toggleTheme, toggleEditorTheme } = themeSlice.actions;

export default themeSlice.reducer;
