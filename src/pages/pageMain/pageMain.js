import Search from '../../components/search/Search';
import PopularFilms from '../../components/popularFilms/PopularFilms';

import bgMain from '../../images/main-bg.jpg';

import './pageMain.scss';

function pageMain() {
  return (
    <div className='main' style={{
      backgroundImage: `url(${bgMain})`
    }}>
        <div className='container'>

          <Search />
          <PopularFilms />

        </div>
    </div>
  )
}

export default pageMain