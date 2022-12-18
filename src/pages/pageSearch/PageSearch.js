import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { pageSearchFetch } from './pageSearchSlice';
import Loader from '../../components/loader/Loader';
import CardItem from '../../components/cardFilm/CardItem';
import Pagination from '../../components/pagination/Pagination';

import './pageSearch.scss';

function PageSearch() {
    const {pageSearch, pageSearchLoadingStatus} = useSelector(state => state.search)
    const { type, number } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pageSearchFetch({type, number}))
    }, [])

    const contentSearch = () => {
        return (
            pageSearch.results.length === 0 ? <p>Хмм, такого у нас нет!</p> : <>
                <div className='search_page-content'>
                    {pageSearch.results.map(film => {
                        return <CardItem film={film} key={film.id} />
                    })}
                </div>
            
                <Pagination
                        number={number}
                        pages={pageSearch.total_pages}
                        pathName={`/search/${type}`}
                        fetchPrev={pageSearchFetch({type, number: +number - 1})}
                        fetchNext={pageSearchFetch({type, number: +number + 1})}
                    />
            </>
        )
    }
    
    const contentView = pageSearchLoadingStatus !== 'fulfilled' ? <Loader /> : <>
        <h1>По вашему запросу: <span>"{type}"</span>, было найдено: <span>"{pageSearch.total_results}"</span></h1>

        <div className='container'>
            {contentSearch()}
        </div>
    </>;

  return (
    <section className='search_page'>
        {contentView}        
    </section>
  )
}

export default PageSearch;