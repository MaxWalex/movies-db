import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoryFetch, categoryGenresFetch, categorySortFetch } from './pageCategorySlice';

import CardItem from "../../components/cardFilm/CardItem";
import Loader from "../../components/loader/Loader";
import PageCategoryAside from "./pageCategoryAside";
import PaginationComponent from "../../components/pagination/Pagination";

import './category.scss';

import imgBg2 from '../../images/cat-bg2.jpg';

function PageCategory() {
  const dispatch = useDispatch()
  const {category, categoryLoadingStatus } = useSelector(state => state.category)
  const { type, param, number } = useParams()

  const [sort, setSort] = useState('popularity.desc')
  const [year, setYear] = useState('')
  const [chooseGenres, setChooseGenres] = useState([])
  const [isSort, setIsSort] = useState(false)

  useEffect(() => {
    dispatch(categoryFetch({type, param, number}))
    dispatch(categoryGenresFetch(type))
  }, [type, param])

  useMemo(() => {
    setSort('popularity.desc')
    setChooseGenres([])
    setYear('')
    setIsSort(false)
  }, [type, param])

  const handleReset = () => {
    setSort('popularity.desc')
    setChooseGenres([])
    setYear('')
    setIsSort(false)
  }

  const handleSelect = (e, id, name) => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active')
      setChooseGenres(chooseGenres.filter(item => item.id !== id))
    } else {
      e.target.classList.add('active')
      setChooseGenres([...chooseGenres, {id, name}])
    }
  }

  const content = <>
    <PageCategoryAside 
      year={year}
      sort={sort}
      chooseGenres={chooseGenres}
      setSort={setSort}
      setYear={setYear}
      handleSelect={handleSelect}
      setIsSort={setIsSort}
      handleReset={handleReset}
    />

    {categoryLoadingStatus !== 'fulfilled' ? <Loader /> : 
      <div className="category_content">
          
        {category.results.length !== 0 ? category.results.map(film => {
          return <CardItem key={film.id} film={film} type={type} />
        }) : 
          <p className="category_content-notfound">По вашему запросу ничего не найдено</p>
        }
      </div>
    }
  </>

    const handleClickPagination = (pagPage) => {

      if (isSort) {
        dispatch(categorySortFetch({type, param: chooseGenres, number: pagPage, year, sort}))
      } else {
        dispatch(categoryFetch({type, param, number: pagPage}))
      }
    }

  return (
    <section className="category" style={{
      backgroundImage: `url(${imgBg2})`
    }}>
      
      <div className="container" style={{justifyContent: categoryLoadingStatus !== 'fulfilled' ? 'center' : 'space-between'}}>
        {content}
      </div>

      <PaginationComponent
        status={categoryLoadingStatus}
        data={category}
        pageRouter={+number}
        handleClickPagination={handleClickPagination}
        pathName={`/category/${type}/${param}`}
      />
      
    </section>
  )
}

export default PageCategory;