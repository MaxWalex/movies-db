import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoryFetch, categoryGenresFetch, categorySortFetch } from './pageCategorySlice';
import CardItem from "../../components/cardFilm/CardItem";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";
import PageCategoryAside from "./pageCategoryAside";

import './category.scss';

function PageCategory() {
  const dispatch = useDispatch()
  const {category, categoryLoadingStatus} = useSelector(state => state.category)
  const { type, param, number } = useParams()

  const [sort, setSort] = useState('popularity.desc')
  const [year, setYear] = useState('')
  const [chooseGenres, setChooseGenres] = useState([])
  const [isSort, setIsSort] = useState(false)

  useEffect(() => {
    dispatch(categoryFetch({type, param, number}))
    dispatch(categoryGenresFetch(type))

    setSort('popularity.desc')
    setChooseGenres([])
    setYear('')
    setIsSort(false)
  }, [type, param])

  const handleSelect = (e, id, name) => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active')
      setChooseGenres(chooseGenres.filter(item => item.id !== id))
    } else {
      e.target.classList.add('active')
      setChooseGenres([...chooseGenres, {id, name}])
    }
  }

  let titlePage = '';

  useMemo(() => {
    switch (param) {
      case 'popular':
        titlePage = 'Популярные';
        break;
      case 'top_rated':
        titlePage = 'В топе';
        break;
      case 'upcoming':
        titlePage = 'Скоро выйдут';
        break;
      case 'airing_today':
        titlePage = 'Просматриваемые сегодня';
        break;
    }
  }, [param])

  const content = categoryLoadingStatus !== 'fulfilled' ? <Loader /> :
  <>
    <PageCategoryAside 
      year={year}
      sort={sort}
      chooseGenres={chooseGenres}
      setSort={setSort}
      setYear={setYear}
      handleSelect={handleSelect}
      setIsSort={setIsSort}
    />

    <div className="category_content">
      
      {category.results.length !== 0 ? category.results.map(film => {
        return <CardItem key={film.id} film={film} type={type} />
      }) : 
        <p className="category_content-notfound">По вашему запросу ничего не найдено</p>
      }
    </div>
  </>

  const pagination = categoryLoadingStatus === 'fulfilled' && <div className="container pagination_wrap">
        <Pagination
          number={number}
          pages={category.total_pages}
          pathName={`/category/${type}/${param}`}
          fetchNext={isSort ? 
            categorySortFetch({type, param: chooseGenres, number: +number + 1, year, sort}) : 
            categoryFetch({type, param, number: +number + 1})}
          fetchPrev={isSort ? 
            categorySortFetch({type, param: chooseGenres, number: +number - 1, year, sort}) : 
            categoryFetch({type, param, number: +number - 1})}
        />
      </div>

  return (
    <section className="category">
      <h2>{titlePage}</h2>
      
      <div className="container" style={{justifyContent: categoryLoadingStatus !== 'fulfilled' ? 'center' : 'space-between'}}>
        {content}
      </div>

      {pagination}
      

    </section>
  )
}

export default PageCategory;