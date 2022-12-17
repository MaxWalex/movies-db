import Search from '../../components/search/Search';
import PopularFilms from '../../components/popularFilms/PopularFilms';

function pageMain() {
  return (
    <div className='main'>
        <div className='container'>

          <Search />
          <PopularFilms />

        </div>
    </div>
  )
}

export default pageMain