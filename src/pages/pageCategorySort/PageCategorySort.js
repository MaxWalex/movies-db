import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genreSortFetch } from './pageCategorySortSlice';
import Loader from "../../components/loader/Loader";
import CardItem from "../../components/cardFilm/CardItem";
import Pagination from "../../components/pagination/Pagination";

import './pageCategorySort.scss';

function PageCategorySort() {
  const { type, number } = useParams()
  const dispatch = useDispatch()
  const [showType, setShowType] = useState('')
  const navigate = useNavigate()

  const { choosenGeners, genreSort, categorySortLoadingStatus } = useSelector(state => state.categorySort)

  useEffect(() => {
    setShowType(type)
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

  const content = categorySortLoadingStatus !== 'fulfilled' ? <Loader /> : genreSort.results.length !== 0 ? <>
            <div className="category_sort-inner">
                {genreSort.results.map(film => {
                  return <CardItem film={film} key={film.id} type={type} />
                })}
            </div>

            <Pagination 
              number={number}
              pages={genreSort.total_pages}
              pathName={`/genre/${type}/sort`}
              choosenGeners={choosenGeners}
              fetchNext={genreSortFetch({type, param: choosenGeners.id, number: +number + 1})}
              fetchPrev={genreSortFetch({type, param: choosenGeners.id, number: +number - 1})}
            />
  </> : <p style={{color: '#000'}}>В текущей категории {type}, нет такого жанра</p>;

  const select = arrayOfType.map(({value, name}) => {
    return <option selected={value === type} key={value} value={value}>{name}</option>
  })

  return (
    <section className="category_sort">
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