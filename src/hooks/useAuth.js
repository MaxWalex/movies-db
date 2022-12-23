import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setFavFilms } from '../reduxSlice/userSlice';

export const useAuth = () => {
    const dispatch = useDispatch()

    const { loggedIn, checkingStatus, favFilms } = useSelector(state => state.user)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, user => {
            if (user) {
              dispatch(setAuth({loggedIn: true, checkingStatus: true, id: user.uid, email: user.email}))
              fetchUserListings(user.uid)
            } else {
              dispatch(setAuth({checkingStatus: false}))
            }
        })

        const fetchUserListings = async (uid) => {
          const listingsRef = collection(db, 'listings')
    
          const querySnap = await getDocs(listingsRef)
    
          let listings = []
    
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })

          let newListings = listings.filter(film => film.data.userRef === uid)

          dispatch(setFavFilms(newListings))
        } 

    }, [])

  return {
    loggedIn,
    checkingStatus,
    favFilms
  }
}