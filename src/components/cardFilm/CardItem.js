
import { Link } from 'react-router-dom';
import ProgressBar from 'react-customizable-progressbar';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setFavFilms } from '../../reduxSlice/userSlice';

import Flip from 'react-reveal/Flip';

import {
    collection,
    addDoc,
    getDocs
  } from 'firebase/firestore'
import { db } from '../../firebase/firebase';

import imgNF from '../../images/imgNotFound.jpg';
import './cardItem.scss';

function CardItem({film, type = 'movie'}) {
    const dispatch = useDispatch()
    const { userID, favFilms, loggedIn } = useSelector(state => state.user)

    const title = film.title ? film.title : film.name;
    const typeMedia = film.media_type ? film.media_type : type;

    const img = film.poster_path === null ? imgNF : `https://image.tmdb.org/t/p/w500${film.poster_path}`;

    const progressBar = film.vote_average !== 0 && <ProgressBar
                                                        progress={film.vote_average}
                                                        steps={10}
                                                        radius={100}
                                                        className='progress_bar'
                                                        initialAnimation={true}
                                                        transition='2s ease'
                                                        trackTransition='1s ease'
                                                    >
                                                        <div className='vote'>{parseFloat(film.vote_average).toFixed(1)}</div>
                                                    </ProgressBar>

    const durration = 10000;                                                 

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
            if (item.data.id === film.id) {
                toast.warning(`Фильм "${title}" уже был добавлен!`)
                flag = false;
                return; 
            }
            return true;
        })

        if (flag) {
            try {

                const cardData = {
                    id: film.id,
                    imgUrl: img,
                    title: title,
                    type: typeMedia,
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
    <Flip left cascade>
    <div className='card'>
        <img src={img} />

        {loggedIn && <svg onClick={() => handleFavourite()} className='fav' version="1.1"  x="0px" y="0px" viewBox="0 0 471.701 471.701">
            <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                C444.801,187.101,434.001,213.101,414.401,232.701z"/>
        </svg>}
        
        {progressBar}

        <h3>{title}</h3>

        <div className='card_play'>
            <Link to={`/${typeMedia}/${film.id}/`}>
                <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                    <g id="Play">
                        <path d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995   C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012   C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993   c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z    M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"/>
                        <path d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62   C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"/>
                    </g>   
                </svg>
            </Link>
        </div>
    </div>
    </Flip>
  )
}

export default CardItem