import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { singlePageActorTvFetch } from '../PageSingleActorSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';

function PageSingleActorTv() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const {tv, singlePageActorTvLoadingStatus} = useSelector(state => state.singlePageActor)

    useEffect(() => {
        dispatch(singlePageActorTvFetch(id))
    }, [])

  return (
    <>
        {singlePageActorTvLoadingStatus !== 'fulfilled' ? <Loader /> : <div className='famous_block'>
          {tv.cast.map(item => {
            return <div className='actor_fam-item' key={item.original_name + item.character}>
              <div className='year'>{item.first_air_date ? item.first_air_date.split('-')[0] : '-'}</div>
              <Link to={`/tv/${item.id}`}>{item.original_name}</Link>
              {item.character && <div className='role'>в роли <span>{item.character}</span></div>}
            </div>
          })}  
        </div>}
    </>
  )
}

export default PageSingleActorTv;