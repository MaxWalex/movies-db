import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { singlePageActorMoviesFetch } from '../PageSingleActorSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';

function PageSingleActorMovies() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const {movies, singlePageActorMoviesLoadingStatus} = useSelector(state => state.singlePageActor)

    useEffect(() => {
        dispatch(singlePageActorMoviesFetch(id))
    }, [])

  return (
    <>
        {singlePageActorMoviesLoadingStatus !== 'fulfilled' ? <Loader /> : <div className='famous_block'>
          {movies.cast.map(item => {
            return <div className='actor_fam-item' key={item.original_title + item.character}>
              <div className='year'>{item.release_date ? item.release_date.split('-')[0] : '-'}</div>
              <Link to={`/movie/${item.id}`}>{item.original_title}</Link>
              {item.character && <div className='role'>в роли <span>{item.character}</span></div>}
            </div>
          })}  
        </div>}
    </>
  )
}

export default PageSingleActorMovies;