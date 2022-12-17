import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoryFetch, categoryGenresFetch, categorySortFetch } from './pageCategorySlice';
import CardItem from "../../components/cardFilm/CardItem";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";

import './category.scss';

function PageCategory() {
  const dispatch = useDispatch()
  const {category, categoryLoadingStatus, genres, categoryGenresLoadingStatus} = useSelector(state => state.category)
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

  

  return (
    <section className="category">
      <h2>{titlePage}</h2>
      <div className="container" style={{justifyContent: categoryLoadingStatus !== 'fulfilled' ? 'center' : 'space-between'}}>

        {categoryLoadingStatus !== 'fulfilled' ? <Loader /> :
        
          <>
            <aside className="aside">
              <div className="aside_content sorting">
                <h4>Сортировать</h4>
                <div className="aside_wrap">
                  <select onChange={e => setSort(e.target.value)}>
                    <option value="popularity.desc">Популярности (убывание)</option>
                    <option value="popularity.asc">Популярности (возрастание)</option>
                    <option value="vote_average.desc">Рейтингу (убывание)</option>
                    <option value="vote_average.asc">Рейтингу (возрастание)</option>
                    <option value="primary_release_date.desc">Дате выпуска (убывание)</option>
                    <option value="primary_release_date.asc">Дате выпуска (возрастание)</option>
                    <option value="title.asc">Названию (А-Я)</option>
                    <option value="title.desc">Названию (Я-А)</option>
                  </select>
                </div>
              </div>
              <div className="aside_content filtering">
                <h4>Фильтры</h4>

                <div className="aside_wrap">
                  <div className="aside_wrap-item">
                    <h5>Год выпуска</h5>
                    <div className="aside_wrap-item_year">
                      <input type="range" min="1900" max="2022" value={year} onChange={e => setYear(e.target.value)} />
                      <input placeholder="Год" value={year} onChange={e => setYear(e.target.value)} />  
                    </div>
                  </div>

                  <div className="aside_wrap-item">
                    <h5>Жанр</h5>
                    <div className="aside_wrap-item_genre">

                      {categoryGenresLoadingStatus !== 'fulfilled' ? <Loader /> :
                        genres.genres.map(({id, name}) => {
                          return <span 
                                    key={id} 
                                    id={id} 
                                    onClick={(e) => handleSelect(e, id, name)}
                                    >{name}</span>
                        })
                      }

                    </div>
                  </div>
                </div>

                <a href="#" className={`aside_btn`} onClick={e => {
                  e.preventDefault()
                  dispatch(categorySortFetch({type, param: chooseGenres, number, year, sort}))
                  setIsSort(true)
                }}>Поиск</a>
              </div>
            </aside>

            <div className="category_content">
              
              {category.results.length !== 0 ? category.results.map(film => {
                return <CardItem key={film.id} film={film} type={type} />
              }) : 
                <p className="category_content-notfound">По вашему запросу ничего не найдено</p>
              }
            </div>
          </>
        }

      </div>

      <div className="container pagination_wrap">
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

    </section>
  )
}

export default PageCategory;