import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { singlePageActorsFetch } from '../pageSingleSlice'
import { setGenres } from '../../pageCategorySort/pageCategorySortSlice';

import PageSingleTopRightInfo from './PageSingleTopRightInfo';

import HorizontalScroll from 'react-scroll-horizontal';
import Slider from "react-slick";

import imgNotFound from '../../../images/imgNotFound.jpg';


function Actors() {
  const { singlePageActors, singlePageActorsLoadingStatus } = useSelector(state => state.singlePage)

  const parent  = { width: `100%`, height: `100px`}
  const child = { width: `100px`, height: `100px`}

  const settings = {
    className: "slider variable-width",
    arrows: false,
    dots: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    infinite: false,
    autoplay: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          arrows: false,
          dots: false,
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false,
          dots: false,
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          dots: false,
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
        }
      }
    ]
  };

  return (
    <>
      {singlePageActors.length !== 0 && singlePageActors.cast.length !== 0 && <div className='actors'>
            <h3>Актерский состав:</h3>
            {singlePageActorsLoadingStatus === 'fulfilled' && <div style={parent} className='actor_items'><Slider {...settings}>
                    {singlePageActors.cast.map(item => {
                        return <div style={child} className='actor_item' key={item.id}>
                                  <img src={item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : imgNotFound} />
                                  <div className='actor_link'>
                                    <Link to={`/actor/${item.id}/${item.name.replace(/ /g, '-')}`}>{item.name}</Link>
                                  </div>
                                </div>
                    })}
                </Slider></div>
            }
        </div>
      }
    </>
    
  )
}

function PageSingleTopRight() {
    const dispatch = useDispatch()

    const { type, id } = useParams()
    const { singlePage } = useSelector(state => state.singlePage)

    const title = singlePage.title ? singlePage.title : singlePage.name;

    useEffect(() => {
      dispatch(singlePageActorsFetch({id, type}))
    }, [])

  return (
    <div className='single_top-right'>
            <h1>{title}</h1>

            <div className='genres single_top-item'>
                <span>Жанры:</span>
                {
                    singlePage.genres.map(genre => {
                        return <Link
                                to={`/genre/${type}/sort/page/1`}
                                onClick={() => dispatch(setGenres({id: genre.id, name: genre.name}))}
                                key={genre.id}>{genre.name}</Link>
                    })
                }
            </div>

            <PageSingleTopRightInfo />

            <Actors />
    </div>
  )
}

export default PageSingleTopRight