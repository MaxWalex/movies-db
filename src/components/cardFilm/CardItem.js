
import { Link } from 'react-router-dom';
import ProgressBar from 'react-customizable-progressbar';
import './cardItem.scss';

function CardItem({film, type = 'movie'}) {

    const title = film.title ? film.title : film.name;
    const typeMedia = film.media_type ? film.media_type : type;

    const progressBar = film.vote_average !== 0 && <ProgressBar
                                                        progress={film.vote_average}
                                                        steps={10}
                                                        radius={100}
                                                        className='progress_bar'
                                                    >
                                                        <div className='vote'>{parseFloat(film.vote_average).toFixed(1)}</div>
                                                    </ProgressBar>

  return (
    <div className='card'>
        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />

        {progressBar}

        <h3>{title}</h3>

        <div className='card_play'>
            <Link to={`/${typeMedia}/${film.id}/`}>
                <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                    <g id="Play">
                        <path d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995   C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012   C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993   c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z    M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"/>
                        <path d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62   C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"/>
                    </g>   
                </svg>
            </Link>
        </div>
    </div>
  )
}

export default CardItem