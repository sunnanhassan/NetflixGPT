import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {

        nowPlaying: null,
        addPopularMovies: null,    // Add popularMovies to initial state
        topRatedMovies: null,   // Add topRatedMovies to initial state
        trailerVideo: null,

    },
    reducers: {
        addNowPlayingMovies: (state, action) => {

            state.nowPlaying = action.payload;
        },
        addPopularMovies: (state, action) => {

            state.addPopularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {

            state.topRatedMovies = action.payload;
        },
        addTrailerVideos: (state, action) => {
            state.trailerVideo = action.payload;

        }
    },
});

export const { addNowPlayingMovies, addTrailerVideos, addPopularMovies, addTopRatedMovies } = moviesSlice.actions;
export default moviesSlice.reducer; 
