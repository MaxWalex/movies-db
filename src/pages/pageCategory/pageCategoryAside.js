import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { categorySortFetch, categoryFetch} from './pageCategorySlice';
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { toggleAsideFilter } from './pageCategorySlice';

function PageCategoryAside({setSort, setYear, handleSelect, setIsSort, chooseGenres, year, sort, handleReset}) {
  const genresRef = useRef();

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
    const {type, param} = useParams()
    const navigate = useNavigate()
    
    const {categoryGenresLoadingStatus, genres, showAsideFilter} = useSelector(state => state.category)

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

  function handleInput(input) {
    let value = (input.value-input.min)/(input.max-input.min)*100
  }

  const handleSearch = () => {
    dispatch(toggleAsideFilter(false))
    dispatch(categorySortFetch({type, param: chooseGenres, number: 1, year, sort}))
    setIsSort(true)
    navigate(`/category/${type}/${param}/page/${1}`)
  }

  const handleResetFilter = () => {
    dispatch(toggleAsideFilter(false))
    handleReset()
    dispatch(categoryFetch({type, param, number: 1}))
    genresRef.current.querySelectorAll('span').forEach(e => e.classList.remove('active'))
    navigate(`/category/${type}/${param}/page/${1}`)
  }

  return (
    <aside className={`${showAsideFilter ? 'active' : ''}`}>

      <div className="aside">
        <div className="close_aside">
          <span></span>
          <span></span>
        </div>

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
                <input 
                  type="range" 
                  min="1900" 
                  max="2022" 
                  value={year} 
                  onChange={e => setYear(e.target.value)} 
                  onInput={e => handleInput(e.target)} 
                />
                <input placeholder="Год" value={year} onChange={e => setYear(e.target.value)} />  
              </div>
            </div>

            <div className="aside_wrap-item">
              <h5>Жанр</h5>
              <div className="aside_wrap-item_genre" ref={genresRef}>
                {genresList}
              </div>
            </div>
          </div>

          <button className="aside_btn" onClick={() => handleSearch()}>
            Поиск
          </button>

          <button className="aside_btn" onClick={() => handleResetFilter()}>
            Сбросить фильтр
          </button>
        </div>
        </div> 
      </aside>
  )
}

export default PageCategoryAside