import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { pageSearchFetch } from './pageSearchSlice';
import Loader from '../../components/loader/Loader';
import CardItem from '../../components/cardFilm/CardItem';
import PaginationComponent from '../../components/pagination/Pagination';

import bgImg from '../../images/bg-search.jpg';

import './pageSearch.scss';

function PageSearch() {
    const {pageSearch, pageSearchLoadingStatus} = useSelector(state => state.search)
    const { type, number } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pageSearchFetch({type, number}))
    }, [])

    const handleClickPagination = (pagPage) => {

        dispatch(pageSearchFetch({type, number: pagPage}))
      }
   
    const contentSearch = () => {
        
        return (
            pageSearch.results.length === 0 ? <p>Хмм, такого у нас нет!</p> : <>
                <div className='search_page-content'>
                    {pageSearch.results.map(film => {
                        if (film.media_type !== 'person') {
                            return <CardItem film={film} key={film.id} /> 
                        } else {
                            return
                        }
                    })}
                </div>
            
                <PaginationComponent
                        status={pageSearchLoadingStatus}
                        data={pageSearch}
                        pageRouter={+number}
                        handleClickPagination={handleClickPagination}
                        pathName={`/search/${type}`}
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
    <section className='search_page' style={{
        backgroundImage: `url(${bgImg})`
      }}>
        {contentView}        
    </section>
  )
}

export default PageSearch;