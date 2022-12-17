import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.scss'

function Search() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search/${text}/page/1`)
  }

  return (
    <section className='search_block'>
      <h2>Добро пожаловать!</h2>
      <p>Миллионы фильмов, сериалов. Исследуйте сейчас.</p>

      <form onSubmit={() => handleSearch()}>
        <input placeholder='Найди подходящий фильм, сериал...' value={text} onChange={e => setText(e.target.value)} />
        <button>Поиск</button>
      </form>
    </section>  
  )
}

export default Search