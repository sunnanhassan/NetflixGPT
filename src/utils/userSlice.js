import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload; // Return the new user data
        },
        removeUser: (state, action) => {
            return null; // Reset user state to null
        },
    },
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
