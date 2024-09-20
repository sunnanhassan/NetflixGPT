import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./useGPTSlice";
import configReducer from "./configSlice"; // This should match the name of your exported reducer

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        config: configReducer, // This should match the name of the imported reducer
    }
});

export default appStore;
