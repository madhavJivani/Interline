import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
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
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
