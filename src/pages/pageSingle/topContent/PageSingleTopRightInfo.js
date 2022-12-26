import { useSelector } from 'react-redux';

function PageSingleTopRightInfo() {
    const { singlePage } = useSelector(state => state.singlePage)

  return (
    <>   
            <div className='date single_top-item'>
                <span>Год:</span>
                {singlePage.release_date ? singlePage.release_date : singlePage.first_air_date}
            </div>

            {singlePage.production_countries && <div className='countries single_top-item'>
                <span>Страна:</span>
                {singlePage.production_countries.map(country => {
                    return <span key={country.iso_3166_1}>{country.name}</span>
                })}
            </div>}

            {singlePage.runtime && <div className='time single_top-item'>
                <span>Время просмотра:</span>
                {singlePage.runtime} мин.
            </div>}

            {singlePage.number_of_seasons && <div className='seasons single_top-item'>
                <span>К-во сезонов:</span>
                {singlePage.number_of_seasons}
            </div>}
            
            {singlePage.number_of_episodes && <div className='series single_top-item'>
                <span>К-во серий:</span>
                {singlePage.number_of_episodes}
            </div>}

            {singlePage.tagline && <div className='slogan single_top-item'>
                <span>Слоган:</span>
                {singlePage.tagline}
            </div>}

            {singlePage.overview.length !== 0 && <div className='description single_top-item'>
                <span>Описание:</span>
                {singlePage.overview}
            </div>}
    </>
  )
}

export default PageSingleTopRightInfo