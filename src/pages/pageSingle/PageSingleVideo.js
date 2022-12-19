import React from 'react'

function PageSingleVideo({iframe, centered}) {
  return (
    <div className={`single_video ${centered}`}>
        {iframe}
    </div>
  )
}

export default PageSingleVideo