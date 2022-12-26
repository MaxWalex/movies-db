import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/hook.http';

const initialState = {
    actor: [],
    combined: [],
    movies: [],
    tv: [],
    singlePageActorLoadingStatus: 'idle',
    singlePageActorCombinedLoadingStatus: 'idle',
    singlePageActorMoviesLoadingStatus: 'idle',
    singlePageActorTvLoadingStatus: 'idle',
}

export const singlePageActorFetch = createAsyncThunk(
    'singlePageActor/singlePageActorFetch',
    async (id) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/person/${id}?api_key=83b24db968cf6c546c5d8ec3e8254665`) 
    }
)

export const singlePageActorCombinedFetch = createAsyncThunk(
    'singlePageActor/singlePageActorCombinedFetch',
    async (id) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

export const singlePageActorTvFetch = createAsyncThunk(
    'singlePageActor/singlePageActorTvFetch',
    async (id) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

export const singlePageActorMoviesFetch = createAsyncThunk(
    'singlePageActor/singlePageActorMoviesFetch',
    async (id) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

const singlePageActor = createSlice({
    name: 'singlePageActor',
    initialState,
    extraReducers: (build) => {
        build   
            .addCase(singlePageActorFetch.pending, state => {
                state.singlePageActorLoadingStatus = 'pending'
            })
            .addCase(singlePageActorFetch.fulfilled, (state, action) => {
                state.singlePageActorLoadingStatus = 'fulfilled'
                state.actor = action.payload
            })
            .addCase(singlePageActorFetch.rejected, state => {
                state.singlePageActorLoadingStatus = 'rejected'
            })

            .addCase(singlePageActorCombinedFetch.pending, state => {
                state.singlePageActorCombinedLoadingStatus = 'pending'
            })
            .addCase(singlePageActorCombinedFetch.fulfilled, (state, action) => {
                state.singlePageActorCombinedLoadingStatus = 'fulfilled'
                state.combined = action.payload
            })
            .addCase(singlePageActorCombinedFetch.rejected, state => {
                state.singlePageActorCombinedLoadingStatus = 'rejected'
            })

            .addCase(singlePageActorMoviesFetch.pending, state => {
                state.singlePageActorCombinedLoadingStatus = 'pending'
            })
            .addCase(singlePageActorMoviesFetch.fulfilled, (state, action) => {
                state.singlePageActorMoviesLoadingStatus = 'fulfilled'
                state.movies = action.payload
            })
            .addCase(singlePageActorMoviesFetch.rejected, state => {
                state.singlePageActorMoviesLoadingStatus = 'rejected'
            })

            .addCase(singlePageActorTvFetch.pending, state => {
                state.singlePageActorTvLoadingStatus = 'pending'
            })
            .addCase(singlePageActorTvFetch.fulfilled, (state, action) => {
                state.singlePageActorTvLoadingStatus = 'fulfilled'
                state.tv = action.payload
            })
            .addCase(singlePageActorTvFetch.rejected, state => {
                state.singlePageActorTvLoadingStatus = 'rejected'
            })

            .addDefaultCase(() => {})
    }
})

const { reducer } = singlePageActor;

export default reducer;