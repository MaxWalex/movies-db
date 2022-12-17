import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {useHttp} from '../../hooks/hook.http';

const initialState = {
    showSearch: false
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleSearch: (state, action) => {
            state.showSearch = !action.payload
        }
    }
})

const {actions, reducer} = mainSlice;

export default reducer;

export const {toggleSearch} = actions;