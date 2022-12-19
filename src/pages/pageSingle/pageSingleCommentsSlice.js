import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/hook.http';

const initialState = {
    singlePageCommentsLoadingStatus: 'idle',
    comments: []
}

export const singlePageCommentFetch = createAsyncThunk(
    'singlePage/singlePageCommentFetch',
    async ({type, id}) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=83b24db968cf6c546c5d8ec3e8254665&language=en-US`)
    }
)

const commentSlice = createSlice({
    name: 'singlePage',
    initialState,
    reducers: {
        toggleSearch: (state, action) => {
            state.toggleSearch = !action.payload
        }
    },
    extraReducers: (build) => {
        build
            .addCase(singlePageCommentFetch.pending, state => {
                state.singlePageCommentsLoadingStatus = 'pending'
            })
            .addCase(singlePageCommentFetch.fulfilled, (state, action) => {
                state.singlePageCommentsLoadingStatus = 'fulfilled'
                state.comments = action.payload;
            })
            .addCase(singlePageCommentFetch.rejected, state => {
                state.singlePageCommentsLoadingStatus = 'rejected'
            })

            .addDefaultCase(() => {})
    }
})

const { reducer } = commentSlice;

export default reducer;