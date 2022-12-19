// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { categorySortFetch } from './pageCategorySlice';
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function PageCategoryAside({setSort, setYear, handleSelect, setIsSort, chooseGenres, year, sort}) {

    const dispatch = useDispatch()
    const {type, number} = useParams()
    
    const {categoryGenresLoadingStatus, genres} = useSelector(state => state.category)

  return (
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
  )
}

export default PageCategoryAside