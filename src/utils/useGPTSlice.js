import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGPTSearch: false,
        movieNames: null,
        movieResults: null, // Fixed the property name
    },

    reducers: {
        toggleGPTSearchView: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload; // Fixed property name here
            state.movieNames = movieNames; // Correctly update the state
            state.movieResults = movieResults; // Correctly update the state
        }
    }
});

export const { toggleGPTSearchView, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
