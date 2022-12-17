import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './pagintaion.scss';

function Pagination({number, fetchNext, fetchPrev, pathName, pages}) {
    const dispatch = useDispatch()

    const disabledPrev =  +number === 1 ? 'disable' : '';
    const disabledNext =  +number === pages ? 'disable' : '';

  return (
    <div className='pagination'>
        <Link to={`${pathName}/page/${+number - 1}`} 
        className={disabledPrev}
        onClick={() => {
            dispatch(fetchPrev)
        }}>Назад</Link>

        <span>{number}/{pages}</span>

        <Link to={`${pathName}/page/${+number + 1}`} 
        className={disabledNext}
        onClick={() => {
            dispatch(fetchNext)
        }}>Вперед</Link>
    </div>
  )
}

export default Pagination