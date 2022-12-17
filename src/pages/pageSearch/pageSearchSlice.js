import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/hook.http';

const initialState = {
    pageSearchLoadingStatus: 'idle',
    pageSearch: [],
}

export const pageSearchFetch = createAsyncThunk(
    'pageSearch/pageSearchFetch',
    async ({type, number}) => {
        const {request} = useHttp()
        return await request(`https://api.themoviedb.org/3/search/multi?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU&query=${type}&page=${number}`)
    }
)

const pageSearchSlice = createSlice({
    name: 'pageSearch',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(pageSearchFetch.pending, state => {
                state.pageSearchLoadingStatus = 'loading'
            })
            .addCase(pageSearchFetch.fulfilled, (state, action) => {
                state.pageSearchLoadingStatus = 'fulfilled'
                state.pageSearch = action.payload
            })
            .addCase(pageSearchFetch.rejected, state => {
                state.pageSearchLoadingStatus = 'error'
            })

            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = pageSearchSlice;

export default reducer;