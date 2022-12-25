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

const SvgUser = () => {
    return (
        <svg version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 489 489">
            <path fill="#fff" d="M417.4,71.6C371.2,25.4,309.8,0,244.5,0S117.8,25.4,71.6,71.6S0,179.2,0,244.5s25.4,126.7,71.6,172.9S179.2,489,244.5,489
                s126.7-25.4,172.9-71.6S489,309.8,489,244.5S463.6,117.8,417.4,71.6z M244.5,462C124.6,462,27,364.4,27,244.5S124.6,27,244.5,27
                S462,124.6,462,244.5S364.4,462,244.5,462z"/>
            <path fill="#fff" d="M244.5,203.2c35.1,0,63.6-28.6,63.6-63.6s-28.5-63.7-63.6-63.7s-63.6,28.6-63.6,63.6S209.4,203.2,244.5,203.2z
                    M244.5,102.9c20.2,0,36.6,16.4,36.6,36.6s-16.4,36.6-36.6,36.6s-36.6-16.4-36.6-36.6S224.3,102.9,244.5,102.9z"/>
            <path fill="#fff" d="M340.9,280.5c-22.3-32.8-54.7-49.5-96.4-49.5s-74.1,16.6-96.4,49.5c-16.6,24.4-27.2,57.7-31.4,98.7
                c-0.8,7.4,4.6,14.1,12,14.8c7.4,0.8,14.1-4.6,14.8-12c8.5-82.3,42.5-124,101-124s92.5,41.7,101,124c0.7,6.9,6.6,12.1,13.4,12.1
                c0.5,0,0.9,0,1.4-0.1c7.4-0.8,12.8-7.4,12-14.8C368.1,338.1,357.5,304.9,340.9,280.5z"/>
        </svg>
    )
}

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
                {loggedIn ?  <Link to="/profile"><SvgUser />Профиль</Link> :
                    <Link to="/login"><SvgUser />Войти</Link>
                }
            </div>
        </div>
    </header>
  )
}

export default Header