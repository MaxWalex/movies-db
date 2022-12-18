import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singlePageFetch, singlePageVideoFetch, singlePageIDSFetch } from './pageSingleSlice';
import { setGenres } from '../pageCategorySort/pageCategorySortSlice';
import Loader from '../../components/loader/Loader';

import ProgressBar from 'react-customizable-progressbar'

import './singlePage.scss';

function PageSingle() {
    const dispatch = useDispatch()
    const { id, type, param, number } = useParams()

    const { 
        singlePage, 
        singlePageVideo, 
        singlePageIDS,
        singlePageLoadingStatus, 
        singlePageVideoLoadingStatus,
        singlePageIDSLoadingStatus
    } = useSelector(state => state.singlePage)

    useEffect(() => {
        dispatch(singlePageFetch({id, type})) 
        dispatch(singlePageIDSFetch({id, type}))
    }, [])

    useEffect(() => {
        if (singlePageIDSLoadingStatus === 'fulfilled') {    
            dispatch(singlePageVideoFetch(singlePageIDS.imdb_id))
        }
    }, [singlePageIDSLoadingStatus])

    const centered = singlePageVideoLoadingStatus !== 'fulfilled' ? 'center' : '';

    const iframe = singlePageVideoLoadingStatus !== 'fulfilled' ? <Loader /> : 
                    singlePageVideo.data[0] ? <iframe src={singlePageVideo.data[0].iframe_src} rameborder="0" allowFullScreen></iframe> : 
                    <p>Видео еще не добавлено в базу</p>;

  return (
    <section className='single_page' style={{textAlign: singlePageLoadingStatus !== 'fulfilled' ? 'center' : 'left'}}>

        {singlePageLoadingStatus !== 'fulfilled' ? <Loader /> :
        <>
            <div className='single_page-img' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${singlePage.backdrop_path})`
            }}></div>
            <div className='container'>
                <div className='single_top'>
                    <div className='single_top-left'>
                        <img src={`https://image.tmdb.org/t/p/w500${singlePage.poster_path}`} />
                        {singlePage.vote_average !== 0 && <ProgressBar
                            progress={singlePage.vote_average}
                            steps={10}
                            radius={100}
                            className='progress_bar'
                        >
                            <div className='vote'>{parseFloat(singlePage.vote_average).toFixed(1)}</div>
                        </ProgressBar>}
                    </div>

                    <div className='single_top-right'>
                        <h1>{singlePage.title ? singlePage.title : singlePage.name}</h1>
                        <div className='genres single_top-item'>
                            <span>Жанры:</span>
                            {
                                singlePage.genres.map(genre => {
                                    return <Link
                                            to={`/genre/${type}/sort/page/1`}
                                            onClick={() => dispatch(setGenres({id: genre.id, name: genre.name}))}
                                            key={genre.id}>{genre.name}</Link>
                                })
                            }
                        </div>
                        <div className='date single_top-item'>
                            <span>Год:</span>
                            {singlePage.release_date ? singlePage.release_date : singlePage.first_air_date}
                        </div>
                        <div className='countries single_top-item'>
                            <span>Страна:</span>
                            {singlePage.production_countries.map(country => {
                                return <span key={country.iso_3166_1}>{country.name}</span>
                            })}
                        </div>
                        {singlePage.runtime && <div className='time single_top-item'>
                            <span>Время просмотра:</span>
                            {singlePage.runtime}м.
                        </div>}
                        {singlePage.number_of_seasons && <div className='seasons single_top-item'>
                            <span>К-во сезонов:</span>
                            {singlePage.number_of_seasons}
                        </div>}
                        {singlePage.number_of_episodes && <div className='series single_top-item'>
                            <span>К-во серий:</span>
                            {singlePage.number_of_episodes}
                        </div>}
                        {singlePage.tagline && <div className='slogan single_top-item'>
                            <span>Слоган:</span>
                            {singlePage.tagline}
                        </div>}
                        {singlePage.overview.length !== 0 && <div className='description single_top-item'>
                            <span>Описание:</span>
                            {singlePage.overview}
                        </div>}
                        {!singlePage.budget || singlePage.budget !== 0 && <div className='budget single_top-item'>
                            <span>Бюджет:</span>
                            ${singlePage.budget}
                        </div>}
                    </div>
                </div>

                <div className={`single_video ${centered}`}>
                    {iframe}
                </div>
            </div>
        </>
        }

        
        

        

    </section>
  )
}

export default PageSingle;