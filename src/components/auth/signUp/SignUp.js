import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { setAuth, setFavFilms } from "../../../reduxSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore"; 
import { db } from '../../../firebase/firebase';

import FormCustom from "../form/FormCustom";

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUserListings = async (userID) => {
    const listingsRef = collection(db, 'listings')

    const querySnap = await getDocs(listingsRef)

    let listings = []

    querySnap.forEach((doc) => {
        return listings.push({
            id: doc.id,
            data: doc.data(),
        })
    })

    let newListings = listings.filter(film => film.data.userRef === userID)

    dispatch(setFavFilms(newListings))
  }  

  const handleRegister = async (email, password) => {
   
    try{
      const auth = getAuth();
      
      const userCredentinal = await createUserWithEmailAndPassword(auth, email, password)
    
      const user = userCredentinal.user;
      dispatch(setAuth({loggedIn: true, checkingStatus: true, id: user.uid, email: user.email}))
      fetchUserListings(user.uid)

      navigate('/')
      toast.success('Успешно зарегистрированы!')

    } catch(err) {
      console.log(err.code)
      if (err.code === 'weak-password') {
        toast.warning('Слабый пароль!')
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Слишком много попыток, попробуйте позже!')
      } else if (err.code === 'auth/invalid-email') {
        toast.error('Не правильная запись почты!')
      } else if (err.code === 'auth/email-already-in-use') {
        toast.error('Такая почта уже зарегистрирована!')
      }
    }
  }

  return (
    <FormCustom title={'Регистрация'} handleClick={handleRegister} />
  )
}

export default SignUp