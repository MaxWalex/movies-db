import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoryFetch, categoryGenresFetch, categorySortFetch, toggleAsideFilter } from './pageCategorySlice';

import CardItem from "../../components/cardFilm/CardItem";
import Loader from "../../components/loader/Loader";
import PageCategoryAside from "./pageCategoryAside";
import PaginationComponent from "../../components/pagination/Pagination";

import './category.scss';

import imgBg2 from '../../images/cat-bg2.jpg';

function PageCategory() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {category, categoryLoadingStatus } = useSelector(state => state.category)
  const { type, param, number } = useParams()

  const [sort, setSort] = useState('popularity.desc')
  const [year, setYear] = useState('')
  const [chooseGenres, setChooseGenres] = useState([])
  const [isSort, setIsSort] = useState(false)

  useEffect(() => {
    dispatch(categoryFetch({type, param, number}))
  }, [type, param])

  useEffect(() => {
    dispatch(categoryGenresFetch(type))
  }, [type])

  useEffect(() => {
    dispatch(categorySortFetch({type, param: chooseGenres, number, year, sort}))
  }, [number])

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
    dispatch(toggleAsideFilter(false))
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
      <div className="category_wrap">

        <div className="category_content-top">
          <h1>{type === 'movie' ? "Фильмы" : 'Сериалы'}</h1>

          <div className="category_content-top_btns">
            <div className="category_btn category_filter">Фильтр</div>
            <div className="category_btn" onClick={() => navigate(-1)}>Назад</div>
          </div>
        </div>

        <div className="category_content">
          {category.results.length !== 0 ? category.results.map(film => {
            return <CardItem key={film.id} film={film} type={type} />
          }) : 
            <p className="category_content-notfound">По вашему запросу ничего не найдено</p>
          }
        </div>
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

  const handleToggleShowAside = e => {
    if (e.target.classList.contains('category_filter')) {
      dispatch(toggleAsideFilter(true))
    } else if (!e.target.closest('.aside') || e.target.closest('.close_aside')) {
      dispatch(toggleAsideFilter(false))
    }
  }

  return (
    <section className="category" style={{
      backgroundImage: `url(${imgBg2})`
    }} onClick={(e) => handleToggleShowAside(e)}>
      
      <div className="container" style={{justifyContent: categoryLoadingStatus !== 'fulfilled' ? 'center' : 'space-between'}}>
        {content}
      </div>

      <PaginationComponent
        status={categoryLoadingStatus}
        handleClickPagination={handleClickPagination}
        data={category}
        pageRouter={+number}
        pathName={`/category/${type}/${param}`}
      />
      
    </section>
  )
}

export default PageCategory;