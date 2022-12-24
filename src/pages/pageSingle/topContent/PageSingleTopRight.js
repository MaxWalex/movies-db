import { Link } from 'react-router-dom';
import { setGenres } from '../../pageCategorySort/pageCategorySortSlice';

function PageSingleTopRight({pageInfo, dispatch, type}) {
    const title = pageInfo.title ? pageInfo.title : pageInfo.name;

  return (
    <div className='single_top-right'>
            <h1>{title}</h1>

            <div className='genres single_top-item'>
                <span>Жанры:</span>
                {
                    pageInfo.genres.map(genre => {
                        return <Link
                                to={`/genre/${type}/sort/page/1`}
                                onClick={() => dispatch(setGenres({id: genre.id, name: genre.name}))}
                                key={genre.id}>{genre.name}</Link>
                    })
                }
            </div>
            
            <div className='date single_top-item'>
                <span>Год:</span>
                {pageInfo.release_date ? pageInfo.release_date : pageInfo.first_air_date}
            </div>

            {pageInfo.production_countries && <div className='countries single_top-item'>
                <span>Страна:</span>
                {pageInfo.production_countries.map(country => {
                    return <span key={country.iso_3166_1}>{country.name}</span>
                })}
            </div>}

            {pageInfo.runtime && <div className='time single_top-item'>
                <span>Время просмотра:</span>
                {pageInfo.runtime}м.
            </div>}

            {pageInfo.number_of_seasons && <div className='seasons single_top-item'>
                <span>К-во сезонов:</span>
                {pageInfo.number_of_seasons}
            </div>}
            
            {pageInfo.number_of_episodes && <div className='series single_top-item'>
                <span>К-во серий:</span>
                {pageInfo.number_of_episodes}
            </div>}

            {pageInfo.tagline && <div className='slogan single_top-item'>
                <span>Слоган:</span>
                {pageInfo.tagline}
            </div>}

            {pageInfo.overview.length !== 0 && <div className='description single_top-item'>
                <span>Описание:</span>
                {pageInfo.overview}
            </div>}
    </div>
  )
}

export default PageSingleTopRight