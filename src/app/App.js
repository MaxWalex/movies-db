import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/header/Header';
import PageMain from '../pages/pageMain/pageMain';
import PageSingle from '../pages/pageSingle/PageSingle';
import PageCategory from '../pages/pageCategory/PageCategory';
import PageSearch from '../pages/pageSearch/PageSearch';

import './app.scss';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />

        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/:type/:id" element={<PageSingle />} />
          <Route path="/search/:type/page/:number" element={<PageSearch />} />
          <Route path="/category/:type/:param/page/:number" element={<PageCategory />} />
        </Routes>

      </div>
    </Router>
    
  );
}

export default App;
