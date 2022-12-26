import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genreSortFetch } from './pageCategorySortSlice';
import Loader from "../../components/loader/Loader";
import CardItem from "../../components/cardFilm/CardItem";
import PaginationComponent from "../../components/pagination/Pagination";

import imgBg2 from '../../images/cat-bg2.jpg';

import './pageCategorySort.scss';

function PageCategorySort() {
  const { type, number } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { choosenGeners, genreSort, categorySortLoadingStatus } = useSelector(state => state.categorySort)

  useEffect(() => {
    dispatch(genreSortFetch({type, param: choosenGeners.id, number}))
  }, [])

  const arrayOfType = [{
    value: 'movie',
    name: 'Фильмы'
  },
  {
    value: 'tv',
    name: 'Сериалы'
  }]

  const handleChangeTypeSelect = (e) => {
    dispatch(genreSortFetch({type: e, param: choosenGeners.id, number}))
    navigate(`/genre/${e}/sort/page/1`)
  }

  const handleClickPagination = (pagPage) => {
    dispatch(genreSortFetch({type, param: choosenGeners.id, number: pagPage}))
  }


  const content = categorySortLoadingStatus !== 'fulfilled' ? <Loader /> : genreSort.results.length !== 0 ? <>
            {
              choosenGeners.name ? <>
                <div className="category_sort-inner">
                    {genreSort.results.map(film => {
                      return <CardItem film={film} key={film.id} type={type} />
                    }) 
                    }
                </div>

                <PaginationComponent 
                  status={categorySortLoadingStatus}
                  data={genreSort}
                  pageRouter={+number}
                  handleClickPagination={handleClickPagination}
                  pathName={`/genre/${type}/sort`}
                />
              </> : <Link to="/">На главную</Link>  
            } 
  </> : <p>В текущей категории {type}, нет такого жанра</p>;

  const select = arrayOfType.map(({value, name}) => {
    return <option selected={value === type} key={value} value={value}>{name}</option>
  })

  return (
    <section className="category_sort" style={{
      backgroundImage: `url(${imgBg2})`
    }}>
      <div className="container">

        <div className="category_sort-top">
          <h2>Фильмы за жанром: {choosenGeners.name ? choosenGeners.name : 'Не выбран'}</h2>
          <select onChange={e => handleChangeTypeSelect(e.target.value)}>  
            {select}
          </select>
        </div>

        {content}
      
      </div>
    </section>
  )
}

export default PageCategorySort;