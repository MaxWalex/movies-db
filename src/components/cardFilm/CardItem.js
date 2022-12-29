
import { useState } from 'react';

import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setFavFilms } from '../../reduxSlice/userSlice';

import ProgressBar from 'react-customizable-progressbar';
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
    // const [disable, setDisable] = useState(false)
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
            if (handleFavourite.cantClick) return;

            handleFavourite.cantClick = true;

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
                        // .then(() => setDisable(true))
                        // .finally(() => {
                        //     console.log(1)
                        //     setDisable(false)
                        // })
    
                    fetchUserListings()
    
                    toast.success(`Фильм "${title}" добавлен в избранные!`)
                } catch(err) {
                    console.log(err)
                }
            }

            setTimeout(()=>{
                handleFavourite.cantClick = false;
            }, 500 )
    }

  return (
    <Flip left cascade>
    <div className='card'>
        <LazyLoad once offset={100} height={380}>
            <img src={img} />
        </LazyLoad>

        {loggedIn && <svg onClick={() => handleFavourite()} className='fav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z" style={{fill: "#f2e35b"}}/></svg>}

        
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