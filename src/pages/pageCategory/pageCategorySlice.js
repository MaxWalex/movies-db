import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/hook.http';

const initialState = {
    categoryLoadingStatus: 'idle',
    categorySortLoadingStatus: 'idle',
    categoryGenresLoadingStatus: 'idle',
    category: [],
    genres: []
}

export const categoryFetch = createAsyncThunk(
    'category/categoryFetch',
    async ({type, param, number}) => {
        const {request} = useHttp()
        return await request(`https://api.themoviedb.org/3/${type}/${param}?page=${number}&api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`)
    }
)

export const categoryGenresFetch = createAsyncThunk(
    'category/categoryGenresFetch',
    async (type) => {
        const {request} = useHttp()
        return await request(`https://api.themoviedb.org/3/genre/${type}/list?api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU`)
    }
)

export const categorySortFetch = createAsyncThunk(
    'category/categorySortFetch',
    async ({type, param, number, year, sort}) => {
        let sortYear = year ? `primary_release_year=${year}` : '';
        let sortBy = sort ? `sort_by=${sort}` : '';

        let newArr = []
        param.forEach(item => {
            newArr.push(item.id)
        })

        let genres = newArr.join(',')
        let sortGenres = genres ? `with_genres=${genres}` : '';

        const {request} = useHttp()
        return await request(`https://api.themoviedb.org/3/discover/${type}?page=${number}&api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU&${sortGenres}&${sortYear}&${sortBy}`)
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(categoryFetch.pending, state => {
                state.categoryLoadingStatus = 'loading'
            })
            .addCase(categoryFetch.fulfilled, (state, action) => {
                state.categoryLoadingStatus = 'fulfilled'
                state.category = action.payload
            })
            .addCase(categoryFetch.rejected, state => {
                state.categoryLoadingStatus = 'error'
            })

            .addCase(categoryGenresFetch.pending, state => {
                state.categoryGenresLoadingStatus = 'loading'
            })
            .addCase(categoryGenresFetch.fulfilled, (state, action) => {
                state.categoryGenresLoadingStatus = 'fulfilled'
                state.genres = action.payload
            })
            .addCase(categoryGenresFetch.rejected, state => {
                state.categoryGenresLoadingStatus = 'error'
            })

            .addCase(categorySortFetch.pending, state => {
                state.categorySortLoadingStatus = 'loading'
            })
            .addCase(categorySortFetch.fulfilled, (state, action) => {
                state.categorySortLoadingStatus = 'fulfilled'
                state.category = action.payload
            })
            .addCase(categorySortFetch.rejected, state => {
                state.categorySortLoadingStatus = 'error'
            })

            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = categorySlice;

export default reducer;