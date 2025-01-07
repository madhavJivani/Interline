import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
    name: "code",
    initialState: [],
    reducers: {
        setCodes(state, action) {
            const obj = action.payload;
            obj.forEach((item, index) => {
                item.status = index === 0; // Assign status directly
            });
            return obj; // Return the modified array
        },
        removeCodes() {
            return [];
        },
    },
});

export const { setCodes, removeCodes } = codeSlice.actions;

export default codeSlice.reducer;
