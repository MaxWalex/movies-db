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

        {loggedIn && <svg onClick={() => handleFavourite()} className='fav' version="1.1"  x="0px" y="0px" viewBox="0 0 471.701 471.701">
              <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                  c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                  l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                  C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                  s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                  c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                  C444.801,187.101,434.001,213.101,414.401,232.701z"/>
            </svg>}

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