import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileMenu } from '../../reduxSlice/main'

function Menu() {
    const dispatch = useDispatch()
    const { showMobileMenu } = useSelector(state => state.main)

    const handleHideMenu = e => {
        if (e.target.classList.contains('close_menu') || !e.target.closest('.menu_list')) {
            dispatch(toggleMobileMenu(true))
        }
    }

  return (
    <>
        <nav className={showMobileMenu ? 'active' : ''} onClick={e => handleHideMenu(e)}>
            <div className='close_menu'>
                <span></span>
                <span></span>
            </div>
            <ul className='menu_list'>
                <li className='has_children'><span><Link to="category/movie/popular/page/1">Фильмы</Link></span>
                    <ul className='sub_menu'>
                        <li><Link to="category/movie/popular/page/1">Популярные</Link></li>
                        <li><Link to="category/movie/top_rated/page/1">В топе</Link></li>
                        <li><Link to="category/movie/upcoming/page/1">Скоро выйдут</Link></li>
                    </ul>
                </li>
                <li className='has_children'><span><Link to="category/tv/popular/page/1">Сериалы</Link></span>
                    <ul className='sub_menu'>
                        <li><Link to="category/tv/popular/page/1">Популярные</Link></li>
                        <li><Link to="category/tv/top_rated/page/1">В топе</Link></li>
                        <li><Link to="category/tv/airing_today/page/1">Новинки</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </>
    
  )
}

export default Menu