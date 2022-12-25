import { Link } from 'react-router-dom';

import './notfound.scss';

function NotFound() {
  return (
    <section className='notfound'>
      <div className='container'>
        <h1>404</h1>
        <div className='text'>
          Страницу не найдено <Link to="/">на главную</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound