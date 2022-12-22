import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reduxSlice/userSlice";
import { toast } from 'react-toastify';
import { setAuth } from "../../../reduxSlice/userSlice";
import { useNavigate } from "react-router-dom";
// import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
// import { db } from '../../../firebase/firebase'

import Form from "../form/Form";
import { Navigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (email, password) => {
   
    try{
      const auth = getAuth();
      
      const userCredentinal = await createUserWithEmailAndPassword(auth, email, password)
    
      const user = userCredentinal.user;

      dispatch(setUser(user.email))

      navigate('/')
      toast.success('Успешно зарегистрированы!')

      dispatch(setAuth({loggedIn: true, checkingStatus: true}))

      // await setDoc(doc(db, 'people', user.uid), {email, password})

    } catch(err) {
      if (err.code === 'weak-password') {
        toast.warning('Слабый пароль!')
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Слишком много попыток, попробуйте позже!')
      } else if (err.code === 'auth/invalid-email') {
        toast.error('Не правильная запись почты!')
      } else if (err.code === 'email-already-in-use') {
        toast.error('Такая почта уже зарегистрирована!')
      }
    }
  }

  return (
    <Form title={'Регистрация'} handleClick={handleRegister} />
  )
}

export default SignUp