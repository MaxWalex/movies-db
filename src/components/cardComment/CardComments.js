import React from 'react'

import user from '../../images/blank-profile-picture-973460__340.webp'

function CardComment({film, type}) {

  return (
    <div className='comment_item'>
        <img src={user} />
        <div className='comment_item-info'>
            <div className='comment_item-info_top'>
                <p>{film.author_details.username}</p>
                <p>{film.author_details.name}</p>
            </div>
            <div className='comment_item-content'>
                {film.content}
            </div>
        </div>
    </div>
  )
}

export default CardComment