
import PageSingleTopLeft from './PageSingleTopLeft';
import PageSingleTopRight from './PageSingleTopRight';

function PageSingleTop({pageInfo, dispatch, type}) {
  return (
    <div className='single_top'>
        <PageSingleTopLeft pageInfo={pageInfo} dispatch={dispatch} type={type} />

        <PageSingleTopRight pageInfo={pageInfo} dispatch={dispatch} type={type} />
    </div>
  )
}

export default PageSingleTop