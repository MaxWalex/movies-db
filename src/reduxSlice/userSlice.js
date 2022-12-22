import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    checkingStatus: true,
    email: null,
    favFilms: []
    // token: null,
    // id: null,
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            state.checkingStatus = action.payload.status;
        },
        setUser: (state, action) => {
            state.email = action.payload;
            // state.token = action.payload.token;
            // state.id = action.payload.id;
        },
        removeUser: (state) => {
            state.email = null;
            // state.token = null;
            // state.id = null;
        }
    }
})

const {actions, reducer} = userSLice;

export default reducer;

export const {setUser, removeUser, setAuth} = actions;
