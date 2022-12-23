import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { setAuth } from "../../../reduxSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"; 
import { db } from '../../../firebase/firebase'

import Form from "../form/Form";

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (email, password) => {
   
    try{
      const auth = getAuth();
      
      const userCredentinal = await createUserWithEmailAndPassword(auth, email, password)
    
      const user = userCredentinal.user;

      navigate('/')
      toast.success('Успешно зарегистрированы!')

      dispatch(setAuth({loggedIn: true, checkingStatus: true, userID: user.uid, email: user.email}))

      const formData = {email, password, timestamp: serverTimestamp()}

      await setDoc(doc(db, `users`, user.uid), formData);

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