import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/hook.http';

const initialState = {
    singlePageLoadingStatus: 'idle',
    singlePageVideoLoadingStatus: 'idle',
    singlePageIDSLoadingStatus: 'idle',
    singlePageActorsLoadingStatus: 'idle',

    singlePage: [],
    singlePageVideo: [],
    singlePageIDS: [],
    singlePageActors: []
}

export const singlePageFetch = createAsyncThunk(
    'singlePage/singlePageFetch',
    async ({id, type}) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${id}?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

export const singlePageIDSFetch = createAsyncThunk(
    'singlePage/singlePageIDSFetch', 
    async ({id, type}) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

export const singlePageVideoFetch = createAsyncThunk(
    'singlePage/singlePageVideoFetch',
    async (id) => {
        const { request } = useHttp()
        return await request(`https://videocdn.tv/api/short?imdb_id=${id}&api_token=ETGz3l3Gz3SJBynR2QWz3o5ctPAeT8AY`) 
    }
)

export const singlePageActorsFetch = createAsyncThunk(
    'singlePage/singlePageActorsFetch',
    async ({id, type}) => {
        const { request } = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`) 
    }
)

const mainSlice = createSlice({
    name: 'singlePage',
    initialState,
    reducers: {
        toggleSearch: (state, action) => {
            state.toggleSearch = !action.payload
        }
    },
    extraReducers: (build) => {
        build   
            .addCase(singlePageFetch.pending, state => {
                state.singlePageLoadingStatus = 'pending'
            })
            .addCase(singlePageFetch.fulfilled, (state, action) => {
                state.singlePageLoadingStatus = 'fulfilled'
                state.singlePage = action.payload
            })
            .addCase(singlePageFetch.rejected, state => {
                state.singlePageLoadingStatus = 'rejected'
            })

            .addCase(singlePageVideoFetch.pending, state => {
                state.singlePageVideoLoadingStatus = 'pending'
            })
            .addCase(singlePageVideoFetch.fulfilled, (state, action) => {
                state.singlePageVideoLoadingStatus = 'fulfilled'
                state.singlePageVideo = action.payload
            })
            .addCase(singlePageVideoFetch.rejected, state => {
                state.singlePageVideoLoadingStatus = 'rejected'
            })

            .addCase(singlePageIDSFetch.pending, state => {
                state.singlePageIDSLoadingStatus = 'pending'
            })
            .addCase(singlePageIDSFetch.fulfilled, (state, action) => {
                state.singlePageIDSLoadingStatus = 'fulfilled'
                state.singlePageIDS = action.payload
            })
            .addCase(singlePageIDSFetch.rejected, state => {
                state.singlePageIDSLoadingStatus = 'rejected'
            })

            .addCase(singlePageActorsFetch.pending, state => {
                state.singlePageActorsLoadingStatus = 'pending'
            })
            .addCase(singlePageActorsFetch.fulfilled, (state, action) => {
                state.singlePageActorsLoadingStatus = 'fulfilled'
                state.singlePageActors = action.payload
            })
            .addCase(singlePageActorsFetch.rejected, state => {
                state.singlePageActorsLoadingStatus = 'rejected'
            })

            .addDefaultCase(() => {})
    }
})

const { reducer } = mainSlice;

export default reducer;