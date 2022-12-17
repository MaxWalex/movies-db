import { configureStore } from '@reduxjs/toolkit';

import main from '../reduxSlice/main';
import popFilms from '../components/popularFilms/popularFilmsSlice';
import singlePage from '../pages/pageSingle/pageSingleSlice';
import category from '../pages/pageCategory/pageCategorySlice';
import search from '../pages/pageSearch/pageSearchSlice';

const store = configureStore({
    reducer: {
        main,
        popFilms,
        singlePage,
        category,
        search
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;