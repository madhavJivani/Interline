import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    status : "loggedOut"
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loginUser(state, action) {
            state.user = action.payload;
            state.status = "loggedIn";
        },
        logoutUser(state) {
            state.user = {};
            state.status = "loggedOut";
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
