import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, updatePassword  } from 'firebase/auth';
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

import { useAuth } from '../../hooks/useAuth';

import imgBG from '../../images/profilebg.jpg';

import './profile.scss';

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = getAuth()
  const { favFilms } = useAuth()
  const { email, loggedIn } = useSelector(state => state.user)

  useEffect(() => {
    !loggedIn && navigate('/login')
  }, [])

  const logOut = (e) => {
    e.preventDefault()

    auth.signOut()
    dispatch(removeUser())
    navigate('/')
    toast.success('Успешно вышли из аккаунта!')
  }

  const handleRemoveAll = async () => {
    let newListings = favFilms.filter(film => {
      deleteDoc(doc(db, "listings", film.id));
    })
  
    dispatch(setFavFilms(newListings))
  
    toast.success(`Список понравившихся очищен!`)
  }

  const handleRemove = async (userID, filmTitle) => {
    await deleteDoc(doc(db, "listings", userID));
  
    let newListings = favFilms.filter(film => film.id !== userID)
  
    dispatch(setFavFilms(newListings))
  
    toast.success(`Фильм "${filmTitle}" успешно удален!`)
  } 

  const handleUpdatePassword = async (newPassword) => {
    const user = auth.currentUser;

    updatePassword(user, newPassword)
      .then(toast.success('Пароль успешно изменен!'))
      .catch(error => {
        console.log(error.code)
        toast.error('Что-то пошло не так!')
      })
  }

  const formikInitialsValues = {
    password: ''
  }

  return (
    <section className='profile' style={{
      backgroundImage: `url(${imgBG})`
    }}>
      <div className='container'>
        {!loggedIn ? <Loader /> : <>
          <div className='profile_inner'>
            <h1>Профиль</h1>

            <div className='profile_inner-content'>
              <div className='profile_info'>
                <p>Почта: <span>{email}</span></p>
                <Formik initialValues = {formikInitialsValues}
                  validationSchema = {Yup.object({
                    password: Yup.string()
                            .min(6, 'Минимум 6 символа для заполнения')
                            .required('Пароль обязателен для заполнения!'),
                  })}
                  onSubmit = {(values) => {
                      JSON.stringify(values, null, 2)
                      handleUpdatePassword(values.password)
                  }}
                  resetForm
                >
                  {/* <Form className='profile_form'>
                    <p>Изменить пароль:</p>
                    <div className='profile_form-wrap'>
                      <div>
                        <Field name='password' type="password" />
                        <ErrorMessage component="div" name='password' className='error' />
                      </div>
                      <button type='submit'>Обновить</button>
                    </div>
                  </Form> */}
                </Formik>
                <button onClick={e => logOut(e)}>Выйти из аккаунта</button>
              </div>

              <div className='profile_fav-films'>
                <div className='profile_fav-films_top'>
                  <h2>Список понравившихся</h2> 
                  <button onClick={() => handleRemoveAll()}>Очистить все</button>
                </div>
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
            </div>
            
          </div>
          
          
        </>
        }
      </div>
    </section>
  )
}

export default Profile