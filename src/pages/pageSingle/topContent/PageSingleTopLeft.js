import { useParams } from 'react-router-dom';
import ProgressBar from 'react-customizable-progressbar';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setFavFilms } from '../../../reduxSlice/userSlice';
import {
    collection,
    addDoc,
    getDocs
  } from 'firebase/firestore'
import { db } from '../../../firebase/firebase';

import imgNotFound from '../../../images/imgNotFound.jpg'

function PageSingleTopLeft() {
    const dispatch = useDispatch()

    const { userID, favFilms, loggedIn } = useSelector(state => state.user)
    const { singlePage } = useSelector(state => state.singlePage)
    const { type } = useParams()

    const title = singlePage.title ? singlePage.title : singlePage.name;

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
            if (item.data.id === singlePage.id) {
                toast.warning(`Фильм "${title}" уже был добавлен!`)
                flag = false;
                return; 
            }
            return true;
        })

        if (flag) {
            try {

                const cardData = {
                    id: singlePage.id,
                    imgUrl: `https://image.tmdb.org/t/p/w500${singlePage.poster_path}`,
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
        <div className='single_top-left_wrap'>
            <img src={singlePage.poster_path ? `https://image.tmdb.org/t/p/w500${singlePage.poster_path}` : imgNotFound } />

            {loggedIn && <svg onClick={() => handleFavourite()} className='fav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z" style={{fill: "#f2e35b"}}/></svg>}

            {singlePage.vote_average !== 0 && <ProgressBar
                progress={singlePage.vote_average}
                steps={10}
                radius={100}
                className='progress_bar'
            >
                <div className='vote'>{parseFloat(singlePage.vote_average).toFixed(1)}</div>
            </ProgressBar>}
        </div>
        
    </div>
  )
}

export default PageSingleTopLeft