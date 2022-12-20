import React from 'react'

function SearchBlock({clazz, setText, text, handleSearch}) {
  return (
    <div className={`search_block-header ${clazz}`}>
        <div className='container'>
            <form onSubmit={() => handleSearch()}>
                <input required value={text} onChange={e => setText(e.target.value)} placeholder="Найди фильм на вечер..." />
                <button>Поиск</button>
            </form>
        </div>
    </div>
  )
}

export default SearchBlock