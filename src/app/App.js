import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '../components/header/Header';
import PageMain from '../pages/pageMain/pageMain';
import PageRegister from '../pages/pageRegister/PageRegister';
import PageLogin from '../pages/pageLogin/PageLogin';
import PageResetPassword from '../pages/pageResetPassword/PageResetPassword';
import PageSingle from '../pages/pageSingle/PageSingle';
import PageCategory from '../pages/pageCategory/PageCategory';
import PageSearch from '../pages/pageSearch/PageSearch';
import PageCategorySort from '../pages/pageCategorySort/PageCategorySort';
import Profile from '../pages/profile/Profile';

import NotFound from '../pages/page404/NotFound'
// import ErrorBoundary from '../hooks/ErrorBoudary';

import './app.scss';

function App() {

  return (
    <>
      <Router>
        <div className='app'>
          <Header />

          <Routes>
            <Route path="/profile" element={<Profile />} />

            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/reset-password" element={<PageResetPassword />} />

            <Route path="/" element={<PageMain />} />
            
            <Route path="/:type/:id" element={<PageSingle />} />

            <Route path="/search/:type/page/:number" element={<PageSearch />} />

            <Route path="/category/:type/:param/page/:number" element={<PageCategory />} />
            <Route path="/genre/:type/sort/page/:number" element={<PageCategorySort />} />

            <Route path='*' element={<NotFound />} />
          </Routes>

        </div>
      </Router>

      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
