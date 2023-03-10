import { useHref } from "react-router-dom";

function SearchButton({showSearch, dispatch, toggleSearch}) {
  const href = useHref()

  return (
    <>
      {href !== '/' ? <div className='search' onClick={() => dispatch(toggleSearch(showSearch))}>
                        <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.0938 0.40625C15.6539 0.40625 8.78125 6.99841 8.78125 15.0938C8.78125 18.6107 10.0673 21.8351 12.2266 24.3652L0.0244141 36.0693L2.22559 38.1807L14.4277 26.4766C17.0656 28.5477 20.4271 29.7812 24.0938 29.7812C32.5336 29.7812 39.4062 23.1891 39.4062 15.0938C39.4062 6.99841 32.5336 0.40625 24.0938 0.40625ZM24.0938 3.34375C30.8767 3.34375 36.3438 8.58765 36.3438 15.0938C36.3438 21.5999 30.8767 26.8438 24.0938 26.8438C17.3108 26.8438 11.8438 21.5999 11.8438 15.0938C11.8438 8.58765 17.3108 3.34375 24.0938 3.34375Z" fill="white"/>
                        </svg>
                      </div> : ''}
    </>
  )
}

export default SearchButton