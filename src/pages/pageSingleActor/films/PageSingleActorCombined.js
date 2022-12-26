import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { singlePageActorCombinedFetch } from '../PageSingleActorSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';

import HorizontalScroll from 'react-scroll-horizontal'

import imgNotFound from '../../../images/imgNotFound.jpg'

function PageSingleActorCombined() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const {combined, singlePageActorCombinedLoadingStatus} = useSelector(state => state.singlePageActor)

    useEffect(() => {
        dispatch(singlePageActorCombinedFetch(id))
    }, [])

  return (
    <div className='pop_films'>
        {singlePageActorCombinedLoadingStatus !== 'fulfilled' ? <Loader /> : <div className='famous_block'><HorizontalScroll>
          {combined.cast.map((item, index) => {
            if (index <= 20) {
              return <div className='pop_film'>
                      <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : imgNotFound} />
                      <h4>{item.title}</h4>
                      <div className='card_play'><svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64"><g id="Play"><path fill="#F2E35B" d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995   C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012   C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993   c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z    M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"/><path fill="#F2E35B" d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62   C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"/></g>   </svg></div>
                    </div>
            }
          })}  
        </HorizontalScroll></div>}
    </div>
  )
}

export default PageSingleActorCombined