import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    checkingStatus: true,
    email: null,
    userID: null,
    favFilms: []
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            state.checkingStatus = action.payload.status;
            state.userID = action.payload.id;
            state.email = action.payload.email;
        },
        setFavFilms: (state, action) => {
            state.favFilms = action.payload
        },
        removeUser: (state) => {
            state.loggedIn = false;
            state.checkingStatus = true;
            state.email = null;
            state.userID = null;
            state.favFilms = [];
        }
    }
})

const {actions, reducer} = userSLice;

export default reducer;

export const {removeUser, setAuth, setFavFilms} = actions;
