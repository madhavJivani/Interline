import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    status : 'loggedOut'
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.status = 'loggedIn';
        },
        logout(state) {
            state.user = {};
            state.status = 'loggedOut';
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;