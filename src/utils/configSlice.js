import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        lang: "en", // Ensure this matches the useSelector in your component
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload;
        }
    }
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;
