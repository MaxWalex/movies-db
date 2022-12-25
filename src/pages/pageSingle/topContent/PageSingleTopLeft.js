import { useState } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setFavFilms } from '../../../reduxSlice/userSlice'
import {
    collection,
    addDoc,
    getDocs
  } from 'firebase/firestore'
import { db } from '../../../firebase/firebase';

const SvgComponent = ({children}) => {
  return children
}

function PageSingleTopLeft({pageInfo, type, dispatch}) {
  const title = pageInfo.title ? pageInfo.title : pageInfo.name;
  const { userID, favFilms, loggedIn } = useSelector(state => state.user)

  const fetchUserListings = async () => {
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

  const handleFavourite = async () => {
      let flag = true;

      favFilms.forEach(item => {
          if (item.data.id === pageInfo.id) {
              toast.warning(`Фильм "${title}" уже был добавлен!`)
              flag = false;
              return; 
          }
          return true;
      })

      if (flag) {
          try {

              const cardData = {
                  id: pageInfo.id,
                  imgUrl: `https://image.tmdb.org/t/p/w500${pageInfo.poster_path}`,
                  title: title,
                  type: type,
                  userRef: userID
              }
  
              await addDoc(collection(db, "listings"), cardData)
  
              fetchUserListings()
              toast.success(`Фильм "${title}" добавлен в избранные!`)
          } catch(err) {
              console.log(err)
          }
      }
  }

  return (
    <div className='single_top-left'>
        <img src={`https://image.tmdb.org/t/p/w500${pageInfo.poster_path}`} />

        {loggedIn && <svg onClick={() => handleFavourite()} className='fav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z" style={{fill: "#f2e35b"}}/></svg>}

            

        {pageInfo.vote_average !== 0 && <ProgressBar
            progress={pageInfo.vote_average}
            steps={10}
            radius={100}
            className='progress_bar'
        >
            <div className='vote'>{parseFloat(pageInfo.vote_average).toFixed(1)}</div>
        </ProgressBar>}
    </div>
  )
}

export default PageSingleTopLeft