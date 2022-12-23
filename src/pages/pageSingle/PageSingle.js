import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { singlePageFetch, singlePageVideoFetch, singlePageIDSFetch } from './pageSingleSlice';

import PageSingleComments from './comments/PageSingleComments';
import PageSingleVideo from './video/PageSingleVideo';
import PageSingleSimilarFilms from './similarFilms/PageSingleSimilarFilms';
import Loader from '../../components/loader/Loader';
import PageSingleTop from './topContent/PageSingleTop';

import './singlePage.scss';

function PageSingle() {
    const dispatch = useDispatch()
    const { id, type } = useParams()

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
    }, [id])

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

                <PageSingleTop type={type} pageInfo={singlePage} dispatch={dispatch} />

                <PageSingleVideo iframe={iframe} centered={centered} />

                <PageSingleSimilarFilms type={type} id={id} />

                <PageSingleComments type={type} id={id} />

            </div>
        </>
        }

    </section>
  )
}

export default PageSingle;