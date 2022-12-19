import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { categorySortFetch } from './pageCategorySlice';
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function PageCategoryAside({setSort, setYear, handleSelect, setIsSort, chooseGenres, year, sort}) {

    const [sortArray, setSortArray] = useState([
                            {value: 'popularity.desc',name: 'Популярности (убывание)'},
                            {value: 'popularity.asc',name: 'Популярности (возрастание)'},
                            {value: 'vote_average.desc',name: 'Рейтингу (убывание)'},
                            {value: 'vote_average.asc',name: 'Популярности (возрастание)'},
                            {value: 'primary_release_date.desc',name: 'Дате выпуска (убывание)'},
                            {value: 'primary_release_date.asc',name: 'Дате выпуска (возрастание)'},
                            {value: 'title.asc',name: 'Названию (А-Я)'},
                            {value: 'title.desc',name: 'Названию (Я-А)'},
                        ])
                        
    const dispatch = useDispatch()
    const {type, number} = useParams()
    
    const {categoryGenresLoadingStatus, genres} = useSelector(state => state.category)

    const selectOptions = sortArray.map(({value, name}) => {
                        return <option key={value} value={value}>{name}</option>
                    });

    const genresList = categoryGenresLoadingStatus !== 'fulfilled' ? <Loader /> :
                        genres.genres.map(({id, name}) => {
                        return <span 
                                    key={id} 
                                    id={id} 
                                    onClick={(e) => handleSelect(e, id, name)}
                                    >{name}</span>
                        });

  return (
    <aside className="aside">
              <div className="aside_content sorting">
                <h4>Сортировать</h4>
                <div className="aside_wrap">
                  <select onChange={e => setSort(e.target.value)}>
                    {selectOptions}
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
                      {genresList}
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