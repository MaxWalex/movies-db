import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/hook.http';

const initialState = {
    popFilmsLoadingStatus: 'idle',
    popFilms: [],
}

export const popFilmsFetch = createAsyncThunk(
    'popFilms/popFilmsFetch',
    async () => {
        const {request} = useHttp()
        return await request('https://api.themoviedb.org/3/movie/upcoming?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU')
    }
)

const popFilmsSlice = createSlice({
    name: 'popFilms',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(popFilmsFetch.pending, state => {
                state.popFilmsLoadingStatus = 'loading'
            })
            .addCase(popFilmsFetch.fulfilled, (state, action) => {
                state.popFilmsLoadingStatus = 'finish'
                state.popFilms = action.payload
            })
            .addCase(popFilmsFetch.rejected, state => {
                state.popFilmsLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = popFilmsSlice;

export default reducer;