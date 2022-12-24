import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { popFilmsFetch } from './popularFilmsSlice';

import CardItem from '../cardFilm/CardItem';
import Loader from '../loader/Loader';

import './popular.scss';

function PopularFilms() {
    const dispatch = useDispatch()

    const {popFilms, popFilmsLoadingStatus} = useSelector(state => state.popFilms)

    useEffect(() => {
        dispatch(popFilmsFetch())
    }, [])

  return (
    <section className='popular'>
        <h2>Популярные фильмы:</h2>
        <div className={`popular_content ${popFilmsLoadingStatus !== 'finish' ? 'centered' : ''}`}>
            {
                popFilmsLoadingStatus !== 'finish' ? <Loader /> :
                popFilms.results.map(film => {
                    return <CardItem key={film.id} film={film} />
                })
            }
        </div>
    </section>
  )
}

export default PopularFilms