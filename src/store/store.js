import { configureStore } from '@reduxjs/toolkit';

import main from '../reduxSlice/main';
import user from '../reduxSlice/userSlice';
import popFilms from '../components/popularFilms/popularFilmsSlice';
import singlePage from '../pages/pageSingle/pageSingleSlice';
import category from '../pages/pageCategory/pageCategorySlice';
import search from '../pages/pageSearch/pageSearchSlice';
import categorySort from '../pages/pageCategorySort/pageCategorySortSlice';
import singlePageComment from '../pages/pageSingle/comments/pageSingleCommentsSlice';
import similarSlice from '../pages/pageSingle/similarFilms/PageSingleSimilarFilmsSlice';
import singlePageActor from '../pages/pageSingleActor/PageSingleActorSlice';

const store = configureStore({
    reducer: {
        main,
        user,
        popFilms,
        singlePage,
        singlePageComment,
        similarSlice,
        singlePageActor,
        category,
        categorySort,
        search,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;