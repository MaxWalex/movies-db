import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../reduxSlice/userSlice";
import { toast } from 'react-toastify';

import Form from "../form/Form";

import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (email, password) => {

        try {
          const auth = getAuth()
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
          if (userCredential.user) {
            navigate('/')
            dispatch(setUser(userCredential.user.email))
            toast.success('Успешная авторизация!')
          }
    
        } catch (err) {
          if (err.code === 'auth/wrong-password') {
            toast.error('Не правильный пароль!')
          } else if (err.code === 'auth/too-many-requests') {
            toast.error('Слишком много попыток, попробуйте позже!')
          } else if (err.code === 'auth/user-not-found') {
            toast.error('Пользователь не найден!')
          }
        } 
    }

  return (
    <Form title={'Авторизация'} handleClick={handleLogin} />
  )
}

export default Login;