import React from 'react';
import Loader from '../../../components/loader/Loader';
import { useSelector } from 'react-redux';

function PageSingleVideo({status}) {

  const {singlePageVideo } = useSelector(state => state.singlePage)

  const iframe = status !== 'fulfilled' ? <Loader /> : 
                    singlePageVideo.data[0] ? <iframe src={singlePageVideo.data[0].iframe_src} rameborder="0" allowFullScreen></iframe> : 
                    <p>Видео еще не добавлено в базу</p>;

  const centered = status !== 'fulfilled' ? 'center' : '';

  return (
    <div className={`single_video ${centered}`}>
        {iframe}
    </div>
  )
}

export default PageSingleVideo