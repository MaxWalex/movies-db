import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuth } from '../reduxSlice/userSlice';

export const useAuth = () => {
    const dispatch = useDispatch()

    const { loggedIn, checkingStatus } = useSelector(state => state.user)

    useEffect(() => {
     
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if (user) {
              dispatch(setAuth({loggedIn: true, checkingStatus: true}))
              dispatch(setUser(user.email))
            }
            dispatch(setAuth(...{checkingStatus: false}))
        })
    }, [])

  return {
    loggedIn,
    checkingStatus,
  }
}