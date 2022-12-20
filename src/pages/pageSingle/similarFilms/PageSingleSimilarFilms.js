import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardFilm from '../../../components/cardFilm/CardItem';
import Loader from '../../../components/loader/Loader';

import { singlePageSimilarFetch } from './PageSingleSimilarFilmsSlice';

function PageSingleSimilarFilms({type, id}) {
  const dispatch = useDispatch()

  const { similars, singlePageSimilarsLoadingStatus } = useSelector(state => state.similarSlice)

  useEffect(() => {
    dispatch(singlePageSimilarFetch({type, id}))
  }, [])

  return (
    <div className='single_similar-block'>
        <h2>Вам так же может понравится</h2>
        <div className='single_similar'>
            {singlePageSimilarsLoadingStatus !== 'fulfilled' ? <Loader /> :
                similars.results.length !== 0 ? similars.results.map((films, index) => {
                  if (index <= 3) {
                    return <CardFilm key={films.id} film={films} type={type} />
                  } else return
                }) : <p>Нет похожих фильмов</p>
            }
        </div>
    </div>
  )
}

export default PageSingleSimilarFilms