import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { getAuth } from 'firebase/auth';
import {
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeUser, setFavFilms } from '../../reduxSlice/userSlice';

import Loader from '../../components/loader/Loader';
import FavFilm from './FavFilm';

import './profile.scss'

function Profile() {
  const auth = getAuth()
  const { favFilms } = useAuth()

  const dispatch = useDispatch()

  const { email, loggedIn } = useSelector(state => state.user)

  const navigate = useNavigate()

  const logOut = (e) => {
    e.preventDefault()

    auth.signOut()

    dispatch(removeUser())

    navigate('/')

    toast.success('Успешно вышли из аккаунта!')
  }

  const handleRemove = async (userID, filmTitle) => {
    await deleteDoc(doc(db, "listings", userID));
  
    let newListings = favFilms.filter(film => film.id !== userID)
  
    dispatch(setFavFilms(newListings))
  
    toast.success(`Фильм "${filmTitle}" успешно удален!`)
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
            <h2>Список понравившихся</h2>
            <div className='profile_fav-films_list'>
              {favFilms.length === 0 ? 'Список пуст!' : favFilms.map(film => {
                return <FavFilm
                  handleFavouriteRemove={handleRemove} 
                  uid={film.id}
                  key={film.id}
                  film={film.data} />
              })}
            </div>
          </div>
        </>
        }
      </div>
    </section>
  )
}

export default Profile