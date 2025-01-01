import { createSlice } from "@reduxjs/toolkit";
import { account } from '@/appwrite/configuration.js'

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
            logoutHandler();
            
        },
    },
});

const logoutHandler = async () => {
    await account.deleteSession("current");
    console.log("User logged out");
}
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
