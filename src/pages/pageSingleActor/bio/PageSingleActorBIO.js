import PageSingleActorCombined from "../films/PageSingleActorCombined"

function PageSingleActorBIO({actor}) {
  return (
    <div className='single_actor-top_right'>
        <h1>{actor.name}</h1>

        {actor.biography && <div className="actor_info-item biography">
            <h2>Биография:</h2>
            <p>{actor.biography}</p>
        </div>}
        
        {actor.birthday && <div className="actor_info-item">
            <h2>Дата рождения:</h2>
            <p>{actor.birthday}</p>
        </div>}

        {actor.deathday && <div className="actor_info-item">
            <h2>Дата смерти:</h2>
            <p>{actor.deathday}</p>
        </div>}
        
        {actor.place_of_birth && <div className="actor_info-item">
            <h2>Место рождения:</h2>
            <p>{actor.place_of_birth}</p>
        </div>}

        <div className="slava">
            <h2>Известность за:</h2>
            <PageSingleActorCombined />
        </div>
    </div>
  )
}

export default PageSingleActorBIO