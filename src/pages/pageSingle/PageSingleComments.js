import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { singlePageCommentFetch } from '../pageSingle/pageSingleCommentsSlice';
import Loader from '../../components/loader/Loader';
import CardComment from '../../components/cardComment/CardComments';

function PageSingleComments({id, type}) {
    const dispatch = useDispatch();
    const { comments, singlePageCommentsLoadingStatus } = useSelector(state => state.singlePageComment)

    useEffect(() => {

        dispatch(singlePageCommentFetch({type, id}))
    }, [])

  return (
    <div className='single_comments-block'>
        <h2>Последнии комментарии</h2>
        <div className='single_comments'>
            {singlePageCommentsLoadingStatus !== 'fulfilled' ? <Loader /> :
                comments.results.length !== 0 ? comments.results.map(comment => {
                    return <CardComment key={comment.id} film={comment} type={type} />
                }) : <p>Комментариев пока никто не оставлял</p>
            }
        </div>
    </div>
  )
}

export default PageSingleComments;