import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {useHttp} from '../../hooks/hook.http';

const initialState = {
    showSearch: false,
    showMobileMenu: false
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleSearch: (state, action) => {
            state.showSearch = !action.payload
        },
        toggleMobileMenu: (state, action) => {
            state.showMobileMenu = !action.payload
        }
    }
})

const {actions, reducer} = mainSlice;

export default reducer;

export const {toggleSearch, toggleMobileMenu} = actions;