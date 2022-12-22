import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../reduxSlice/userSlice';

import './profile.scss'

function Profile() {
  const { loggedIn } = useAuth()
  const dispatch = useDispatch()

  const { email } = useSelector(state => state.user)

  const auth = getAuth()
  const navigate = useNavigate()

  const logOut = (e) => {
    e.preventDefault()

    auth.signOut()

    navigate('/')

    toast.success('Успешно вышли из аккаунта!')

    dispatch(setAuth({loggedIn: false, checkingStatus: true}))
}

  return (
    <section className='profile'>
      <div className='container'>
        {!loggedIn ? <Loader /> : <>
          <div className='profile_inner'>
            <h1>Профиль</h1>  
            <div className='profile_info'>
              <p>Почта: {email}</p>
              <button onClick={e => logOut(e)}>Выйти из аккаунта</button>
            </div>
          </div>
          
          <div className='profile_fav-films'>
            <h2>Список желаний</h2>
            <div className='profile_fav-films_list'>Список пуст!</div>
          </div>
        </>
        }
      </div>
    </section>
  )
}

export default Profile