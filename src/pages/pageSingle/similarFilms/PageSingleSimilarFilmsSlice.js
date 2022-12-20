import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/hook.http';

const initialState = {
    singlePageSimilarsLoadingStatus: 'idle',
    similars: []
}

export const singlePageSimilarFetch = createAsyncThunk(
    'singlePage/singlePageSimilarFetch',
    async ({type, id}) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`)
    }
)

const similarSlice = createSlice({
    name: 'singlePageSimilar',
    initialState,
    extraReducers: (build) => {
        build
            .addCase(singlePageSimilarFetch.pending, state => {
                state.singlePageSimilarsLoadingStatus = 'pending'
            })
            .addCase(singlePageSimilarFetch.fulfilled, (state, action) => {
                state.singlePageSimilarsLoadingStatus = 'fulfilled'
                state.similars = action.payload;
            })
            .addCase(singlePageSimilarFetch.rejected, state => {
                state.singlePageSimilarsLoadingStatus = 'rejected'
            })

            .addDefaultCase(() => {})
    }
})

const { reducer } = similarSlice;

export default reducer;