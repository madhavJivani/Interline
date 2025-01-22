import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docs: [], // Stores the list of documents
    currentDoc: {}, // Stores the currently selected or active document
};

const documentSlice = createSlice({
    name: "userDocuments",
    initialState,
    reducers: {
        setDocuments: (state, action) => {
            state.docs = action.payload || [];
            state.currentDoc = action.payload[0] || {};
        },
        eraseDocuments: () => initialState,
        setCurrent: (state,action) => { 
            state.currentDoc = action.payload || {};
        },
        setNewCode: (state, action) => {
            state.currentDoc.code = action.payload.code;
            state.currentDoc.language = action.payload.language;
        },
        updateCurrent: (state, action) => {
            const docId = action.payload;
            // Use .find() instead of .filter() since we're trying to get a single document
            const newDoc = state.docs.find((doc) => doc.$id === docId);

            if (newDoc) {
                state.currentDoc = newDoc;
            }
        },

    },
});

export const { setDocuments, eraseDocuments, setCurrent, setNewCode, updateCurrent } = documentSlice.actions;

export default documentSlice.reducer;
