import { useState, useEffect } from 'react';
import { Link, useNavigate, useHref } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSearch } from '../../reduxSlice/main';
import { useAuth } from '../../hooks/useAuth';
import userIMG from '../../images/user-svgrepo-com.svg';

import SearchButton from './SearchButton';
import SearchBlock from './SearchBlock';

import Menu from './Menu';

import './header.scss'

function Header() {
    const [text, setText] = useState('')

    const { loggedIn } = useAuth()

    const href = useHref()
    const dispatch = useDispatch()
    const { showSearch } = useSelector(state => state.main)

    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/search/${text}/page/1`)
    }

    useEffect(() => {
        document.body.classList.remove('lock')
        dispatch(toggleSearch(true))
    }, [href])

    let clazz = showSearch ? 'active' : '';

  return (
    <header>
        <div className='container'>
            <h1 className='logo'><Link to="/">Movies<span>DB</span></Link></h1>

            <Menu />

            <SearchBlock clazz={clazz} handleSearch={handleSearch} setText={setText} text={text} />

            <div className='header_right'>
                <SearchButton showSearch={showSearch} dispatch={dispatch} toggleSearch={toggleSearch} />
                {loggedIn ?  <Link to="/profile"><img src={userIMG} />Мой кабинет</Link> :
                    <Link to="/login"><img src={userIMG} />Войти</Link>
                }
            </div>
        </div>
    </header>
  )
}

export default Header