import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlePageActorFetch } from './PageSingleActorSlice';
import { useParams } from "react-router-dom";

import PageSingleActorBIO from "./bio/PageSingleActorBIO";
// import PageSingleActorCombined from "./films/PageSingleActorCombined";
import PageSingleActorTv from "./films/PageSingleActorTv";
import PageSingleActorMovies from "./films/PageSingleActorMovies";

import Loader from '../../components/loader/Loader';

import imgBG from '../../images/profilebg.jpg';

import './pageSingleActor.scss';

function PageSingleActor() {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { actor, singlePageActorLoadingStatus} = useSelector(state => state.singlePageActor)

    useEffect(() => {
        dispatch(singlePageActorFetch(id))
    }, [])

  return (
    <section className='single_actor' style={{backgroundImage: `url(${imgBG})`}}>
        {singlePageActorLoadingStatus !== 'fulfilled' ? <Loader /> : <>
            <div className='container'>
                <div className='single_actor-top'>
                    
                    <div className='single_actor-top_left'>
                        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} />
                    </div>

                    <PageSingleActorBIO actor={actor} />
                </div>

                <div className="actor_famouse">
                    <h2>Актёрское искусство</h2>
                    <div className="actor_famouse-wrapp">
                        <div className="actor_famouse-block">
                            <h2>Сериалы</h2>
                            <PageSingleActorTv />
                        </div>
                        <div className="actor_famouse-block">
                            <h2>Фильмы</h2>
                            <PageSingleActorMovies />
                        </div>
                    </div>
                </div>
            </div>
        </>}

    </section>
  )
}

export default PageSingleActor