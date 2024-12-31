import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // want to keep static
    automaticLayout: true,
    renderControlCharacters: true,
    scrollBeyondLastLine:false,

    //  want hinder or change
    selectOnLineNumbers: true,
    lineNumbers: "on",
    minimap: {
        enabled: true,
        size: "fit",
    },
    wordWrap: "on",
    tabSize: 4,
    fontFamily: "Fira Code",
    fontSize: 20,
    fontWeight: "500",
    hover: {
        enabled: true
    },
    cursorStyle: "line",
    renderWhitespace: "trailing",
    smoothScrolling: true,
    inlineSuggest: false,
    mouseWheelZoom: false,
};

const optionSlice = createSlice({
    name: "option",
    initialState: initialState,
    reducers: {
        toggleLine(state) { 
            state.selectOnLineNumbers = !state.selectOnLineNumbers
            state.lineNumbers = state.lineNumbers === "on" ? "off" : "on"
        },
        toggleTabs(state) {
            state.tabSize = state.tabSize === 2 ? 4 : 2
        },
        toggleMinimapVisiblity(state) {
            state.minimap.enabled = !state.minimap.enabled
        },
        toggleMinimapSize(state) {
            state.minimap.size = state.minimap.size === "fit" ? "fill" : "fit"
        },
        toggleWordWrap(state) {
            state.wordWrap = state.wordWrap === "on" ? "off" : "on"
        },
        toggleFontFamily(state,action) {
            state.fontFamily = action.payload
            //  "Courier New", "Monaco", "Roboto Mono" , "Fira Code"
        },
        toggleFontSize(state,action) { 
            state.fontSize = action.payload
        },
        toggleFontWeight(state,action) {
            state.fontWeight = action.payload
        },
        toggleHover(state) {
            state.hover.enabled = !state.hover.enabled
        },
        toggleCursorStyle(state,action) {
            state.cursorStyle = action.payload
            // block , underline, line
        },
        toggleRenderWhitespace(state,action) {
            state.renderWhitespace = action.payload
            // none, boundary, trailing, all
        },
        toggleSmoothScrolling(state) {
            state.smoothScrolling = !state.smoothScrolling
        },
        toggleInlineSuggest(state) {
            state.inlineSuggest = !state.inlineSuggest
        },
        toggleMouseWheelZoom(state) {
            state.mouseWheelZoom = !state.mouseWheelZoom
        },
    }
});

export const { toggleLine, toggleTabs, toggleMinimapVisiblity, toggleMinimapSize, toggleWordWrap, toggleFontFamily, toggleFontSize, toggleFontWeight, toggleHover, toggleCursorStyle, toggleRenderWhitespace, toggleSmoothScrolling, toggleInlineSuggest, toggleMouseWheelZoom } = optionSlice.actions;

export default optionSlice.reducer;