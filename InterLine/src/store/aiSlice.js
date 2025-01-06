import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name: "ai",
    initialState: [],
    reducers: {
        addUserChat(state, action) { 
            const newMsg = {
                role: "user",
                parts:[{text: action.payload}],
            };
            state.push(newMsg);
        },
        addAiChat(state, action) {
            const newMsg = {
                role: "model",
                parts:[{text: action.payload}],
            };
            state.push(newMsg);
        },
    },
});

export const { addUserChat, addAiChat } = aiSlice.actions;

export default aiSlice.reducer;