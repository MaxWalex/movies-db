import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/hook.http';

const initialState = {
    genreSort: [],
    choosenGeners: '',
    categorySortLoadingStatus: 'idle'
}

export const genreSortFetch = createAsyncThunk(
  'genre/genreSortFetch',
  async ({type, param, number}) => {
      const {request} = useHttp()
      return await request(`https://api.themoviedb.org/3/discover/${type}?page=${number}&api_key=83b24db968cf6c546c5d8ec3e8254665&language=ru-RU&with_genres=${param}`)
  }
)

const genreSortSlice = createSlice({
    name: 'genreSort',
    initialState,
    reducers: {
        setGenres: (state, action) => {
          state.choosenGeners = action.payload
        }
    },
    extraReducers: (builder) => {
      builder 
      .addCase(genreSortFetch.pending, state => {
        state.categorySortLoadingStatus = 'loading'
      })
      .addCase(genreSortFetch.fulfilled, (state, action) => {
          state.categorySortLoadingStatus = 'fulfilled'
          state.genreSort = action.payload
      })
      .addCase(genreSortFetch.rejected, state => {
          state.categorySortLoadingStatus = 'error'
      })

      .addDefaultCase(() => {})
    }
})

const {actions, reducer} = genreSortSlice;

export default reducer;

export const {
    setGenres
} = actions;